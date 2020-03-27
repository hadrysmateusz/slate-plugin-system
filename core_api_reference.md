# Core API Reference

## React Components

### Editable Component

The slate-plugin-system's `<Editable />` component is a wrapper around Slate's `<Editable />` component. It functions similarly to it with some notable exceptions.

It accepts an additional `plugins` prop that takes an array of plugins.

The following properties accept arrays of functions instead of a single function:

- decorate
- renderLeaf
- renderElement
- onKeyDown
- onDOMBeforeInput

All of the overrides from the above props and those contained in plugins will be merged and applied automatically.

## React Hooks

### useCreateEditor

A hook which takes an array of plugins as an argument and returns a memoized editor object.

- It uses `createEditor()` to create the basic slate editor object
- It then wraps it using `withReact()` (which means you don't have to add withReact to your plugins list)
- It then wraps it using all `editorOverrides` functions inside your plugins (from right to left)
- It memoizes the editor object using `useMemo()`

## Helpers

### composeOverrides

A function used to merge multiple `editorOverrides` functions into one. Useful for using custom logic with more generic, shared overrides.

The function accepts an array of `editorOverrides` functions and returns a single `editorOverrides` function with all of the functionality inside.

```ts
/* example usage */
export const withList = composeOverrides([
  withListCore(),
  withBreakEmptyReset({ types: ["list_item"] }),
  withDeleteStartReset({ types: ["list_item"] })
])
```

> Documentation for other non-essential utilities is coming soon, until then feel free to look through the source code
