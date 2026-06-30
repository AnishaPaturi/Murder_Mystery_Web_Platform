import fs from "fs";
import path from "path";

// Simple stop words array to improve TF-IDF relevance matching
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
  "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
  "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
  "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into",
  "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
  "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
  "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's",
  "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs",
  "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
  "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't",
  "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
  "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't",
  "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself",
  "yourselves"
]);

// Tokenizes text, removes punctuation, filters out stop words
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

// Recursively lists all markdown files in the docs/ folder
function getMarkdownFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, filesList);
    } else if (filePath.endsWith(".md")) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

// Chunks a markdown file by its headers (h1, h2, h3)
function chunkMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  
  const chunks = [];
  let currentTitle = path.basename(filePath, ".md");
  let currentChunkLines = [];
  let currentSource = "";

  // Extract source from the file if defined at the end (e.g. "Source: ...")
  const sourceMatch = content.match(/Source:\s*(.+)$/m);
  if (sourceMatch) {
    currentSource = sourceMatch[1].trim();
  } else {
    currentSource = `Official Documentation - ${path.basename(path.dirname(filePath))}`;
  }

  for (const line of lines) {
    // If we hit a new header section, save the previous chunk and start a new one
    if (line.startsWith("#") || line.startsWith("##") || line.startsWith("###")) {
      if (currentChunkLines.length > 0) {
        chunks.push({
          title: currentTitle,
          content: currentChunkLines.join("\n").trim(),
          source: currentSource,
          filePath: path.relative(process.cwd(), filePath),
        });
      }
      currentTitle = line.replace(/#+/g, "").trim();
      currentChunkLines = [line];
    } else {
      currentChunkLines.push(line);
    }
  }

  // Push final chunk
  if (currentChunkLines.length > 0) {
    chunks.push({
      title: currentTitle,
      content: currentChunkLines.join("\n").trim(),
      source: currentSource,
      filePath: path.relative(process.cwd(), filePath),
    });
  }

  return chunks;
}

export class RAGService {
  constructor() {
    this.chunks = [];
    this.idf = {};
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    const docsDir = path.join(process.cwd(), "docs");
    const markdownFiles = getMarkdownFiles(docsDir);

    // Chunk all documentation markdown files
    const allChunks = [];
    for (const file of markdownFiles) {
      allChunks.push(...chunkMarkdownFile(file));
    }

    this.chunks = allChunks;

    // Build IDF (Inverse Document Frequency) vocabulary
    const totalDocs = this.chunks.length;
    const documentFrequencies = {};

    this.chunks.forEach((chunk, index) => {
      chunk.tokens = tokenize(chunk.content + " " + chunk.title);
      const uniqueTokens = new Set(chunk.tokens);

      uniqueTokens.forEach(token => {
        documentFrequencies[token] = (documentFrequencies[token] || 0) + 1;
      });
    });

    // Compute IDF
    Object.keys(documentFrequencies).forEach(token => {
      this.idf[token] = Math.log(totalDocs / (documentFrequencies[token] || 1)) + 1;
    });

    // Compute TF-IDF vectors for chunks
    this.chunks.forEach(chunk => {
      chunk.vector = {};
      const termCounts = {};
      
      chunk.tokens.forEach(token => {
        termCounts[token] = (termCounts[token] || 0) + 1;
      });

      Object.keys(termCounts).forEach(token => {
        const tf = termCounts[token] / chunk.tokens.length;
        const idf = this.idf[token] || 1;
        chunk.vector[token] = tf * idf;
      });
    });

    this.initialized = true;
    console.log(`📦 RAG Database Initialized: Loaded ${totalDocs} documentation chunks.`);
  }

  // Similarity retrieval search using TF-IDF cosine-like similarity
  retrieve(query, limit = 3) {
    this.initialize();

    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) {
      return this.chunks.slice(0, limit);
    }

    // Compute TF-IDF vector for query
    const queryVector = {};
    const queryTermCounts = {};
    queryTokens.forEach(token => {
      queryTermCounts[token] = (queryTermCounts[token] || 0) + 1;
    });

    Object.keys(queryTermCounts).forEach(token => {
      const tf = queryTermCounts[token] / queryTokens.length;
      const idf = this.idf[token] || 0.1; // fallback low weight if word not in corpus
      queryVector[token] = tf * idf;
    });

    // Calculate similarity scores for all chunks
    const scoredChunks = this.chunks.map(chunk => {
      let dotProduct = 0;
      let queryNorm = 0;
      let chunkNorm = 0;

      // Dot product
      Object.keys(queryVector).forEach(token => {
        if (chunk.vector[token]) {
          dotProduct += queryVector[token] * chunk.vector[token];
        }
        queryNorm += queryVector[token] * queryVector[token];
      });

      // Norms
      Object.keys(chunk.vector).forEach(token => {
        chunkNorm += chunk.vector[token] * chunk.vector[token];
      });

      const denominator = Math.sqrt(queryNorm) * Math.sqrt(chunkNorm);
      const score = denominator === 0 ? 0 : dotProduct / denominator;

      return {
        ...chunk,
        score,
      };
    });

    // Sort by score descending and return limit
    return scoredChunks
      .filter(chunk => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

export const ragService = new RAGService();
