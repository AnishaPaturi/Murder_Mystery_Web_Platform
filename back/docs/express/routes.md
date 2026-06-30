# Express.js Documentation: Basic Routing

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

## Route Definition

A route definition takes the following structure:
```javascript
app.METHOD(PATH, HANDLER)
```
- `app` is an instance of express.
- `METHOD` is an HTTP request method, in lowercase (like `get`, `post`, `put`, `delete`).
- `PATH` is a path on the server (like `/api/logs`).
- `HANDLER` is the function executed when the route is matched.

## Response Methods

The response object (`res`) has various helper methods to send data back to the client:

### res.json()
Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

Example Handler:
```javascript
app.get('/api/logs', (req, res) => {
  res.json({
    status: 'success',
    logs: []
  });
});
```

Source: Express Official Docs → Getting Started → Basic Routing / API Reference
