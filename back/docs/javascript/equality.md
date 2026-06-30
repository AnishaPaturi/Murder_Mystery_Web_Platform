# MDN Web Docs: Strict Equality (===)

The strict equality (===) operator checks whether its two operands are equal, returning a Boolean result. Unlike the loose equality (==) operator, the strict equality operator always considers operands of different types to be different.

## Strict vs Loose Comparison

### 1. Loose Equality (==)
Loose equality compares two values for equality after converting both values to a common type (coercion).
Example:
```javascript
1 == "1" // Returns true because "1" is coerced to number 1
```

### 2. Strict Equality (===)
Strict equality compares both the value and the type of two operands. If the types differ, it immediately returns false. No coercion is performed.
Example:
```javascript
1 === "1" // Returns false because type number differs from type string
```

## Usage for Security and Signatures
Strict equality is strongly recommended for security checks, authentication tokens, and signature comparisons, as it eliminates unexpected side effects caused by loose type matching.

Example comparison:
```javascript
const isMarcus = (keySignature === 'MARCUS_WEBB_OVERRIDE');
```

Source: MDN Web Docs → JavaScript → Reference → Operators → Strict Equality
