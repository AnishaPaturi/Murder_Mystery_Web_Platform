# MDN Web Docs: HTML Elements and Structure

HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).

"HTML element" is an individual component of an HTML document or web page. HTML documents are composed of a tree of HTML elements and other nodes. Each element is defined by a starting tag, some contents, and an ending tag.

## Key Structural Tags

### Headings (h1 - h6)
HTML headings are defined with the <h1> to <h6> tags.
<h1> defines the most important heading. <h6> defines the least important heading. Headings should be used for main titles, subtitles, and section headers.

Syntax:
```html
<h1>ENVIRONMENTAL TEMPERATURE LOG</h1>
```

### Content Containers (div)
The HTML <div> element is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling it directly, or applying a layout model like Flexbox or Grid). As a "pure" container, the <div> element does not inherently represent anything. Instead, it is used to group content so it can be easily styled or aligned.

Syntax:
```html
<div>
  <!-- Grouped content here -->
</div>
```

### Strong Importance (strong)
The HTML Strong Importance Element (<strong>) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.

Syntax:
```html
<strong>98.6F</strong>
```

Source: MDN Web Docs → HTML → Elements → Reference
