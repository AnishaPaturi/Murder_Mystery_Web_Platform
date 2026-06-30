# MDN Web Docs: JavaScript String Manipulation

Strings are useful for holding data that can be represented in text form. Some of the most-used operations on strings are to check their length, to build and concatenate them, and to split them into arrays.

## String Reversal Methods

In JavaScript, strings are immutable, meaning once a string is created, it cannot be modified in place. To reverse a string, developers commonly split it into an array of individual characters, reverse the array, and then join the array back into a string.

### 1. String.prototype.split()
The split() method takes a pattern and divides a String into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.
Syntax:
```javascript
const charArray = str.split(""); // Splits by character
```

### 2. Array.prototype.reverse()
The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
Syntax:
```javascript
const reversedArray = charArray.reverse();
```

### 3. Array.prototype.join()
The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string.
Syntax:
```javascript
const resultString = reversedArray.join(""); // Joins without commas
```

## Chained Example
These methods can be chained together in a single statement to perform inline string reversal:
```javascript
function reverseString(str) {
  return str.split("").reverse().join("");
}
```

Source: MDN Web Docs → JavaScript → Reference → Global Objects → String
