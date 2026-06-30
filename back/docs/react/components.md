# React Documentation: Components and Props

React lets you build user interfaces out of individual pieces called components. React components are regular JavaScript functions that return markup.

## Functional Components

A React component is a JavaScript function that starts with a capital letter and returns JSX markup. Components can be nested inside other components, allowing you to build complex interfaces from smaller blocks.

Example Component:
```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
    />
  );
}
```

## Passing Props (Properties)

React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

### Destructuring Props
You can destructure props in the component's function signature for cleaner and more readable code:
```jsx
function SuspectCard({ suspect }) {
  return (
    <div className="suspect-card">
      <h3>{suspect.name}</h3>
      <p>Threat Level: {suspect.threat}</p>
    </div>
  );
}
```

### Passing Expressions in JSX
To pass a dynamic JavaScript variable or property inside your JSX elements, wrap the expression in curly braces `{}`:
```jsx
<h3>{suspect.name}</h3>
```

Source: React Official Docs → Describing the UI → Your First Component / Passing Props to a Component
