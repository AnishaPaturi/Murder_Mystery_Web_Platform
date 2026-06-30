# MongoDB & Mongoose Documentation: Queries and Sorting

Mongoose models provide several static helper functions for CRUD (Create, Read, Update, Delete) operations. Each of these functions returns a Mongoose Query object.

A Mongoose query can be executed in two ways: by passing a callback function, or by using promise-based `.then()`/`async-await` syntax.

## Query Helpers

### 1. Model.find()
Finds documents matching specified query parameters.
Syntax:
```javascript
Model.find(filterObject)
```
Example:
```javascript
Log.find({ location: 'Server Room' })
```

## Sorting Query Results

### Query.prototype.sort()
Sets the sort order. If an object is passed, values can be:
- `1` or `asc` for ascending order.
- `-1` or `desc` for descending order.

Syntax:
```javascript
query.sort({ fieldName: -1 }) // Sorts by fieldName in descending order
```

## Chaining Queries
In Mongoose, you can chain query operations together to create complex filters and sorting sequences.

Example:
```javascript
function getLogs() {
  return Log.find({ location: 'Server Room' }).sort({ timestamp: -1 });
}
```

Source: Mongoose Docs → Queries → Model.find / Query.prototype.sort
