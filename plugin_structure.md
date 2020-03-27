## Plugin Structure

A full reference for every property available inside a slate plugin

### renderElement

```ts
type RenderElement = (elementProps: RenderElementProps) => JSX.Element | undefined
```

Function for [rendering elements](https://docs.slatejs.org/concepts/08-rendering). It should return a React element if and **only** if it matches the type it's supposed to handle. If the type isn't supposed to be handled by a given plugin, `renderElement` should return `undefinded`.

Don't add **default cases** and make sure there are **no conflicts** between any and all plugins you're using, because once a `renderElement` function returns an element, no further `renderElement` functions will be run.

### renderLeaf

```ts
type RenderLeaf = (leafProps: RenderLeafProps) => JSX.Element
```

Function for [rendering leaves](https://docs.slatejs.org/concepts/08-rendering#leaves). Because a node can have any number of marks, all `renderLeaf` functions will be called and the leaf node will often be wrapped in multiple React components.

`renderLeaf` always needs to return `children`, wrapped or not.

### editorOverrides

```js
const withSomething = (editor) => {
  /* modify editor object */
  return editor
}
```

Function that wraps the slate `editor` object and adds and/or modifies it's functionality. It's the same concept as the [vanilla slate plugins](https://docs.slatejs.org/concepts/07-plugins).

### onKeyDown

```ts
type OnKeyDown = (event: KeyboardEvent, editor: Editor) => void
```

Function that can be used to add keyboard shortcuts and other special cases for handling keyboard events. [Usage](https://docs.slatejs.org/walkthroughs/02-adding-event-handlers).

### decorate

```ts
type Decorate = (entry: NodeEntry) => Range[]
```

Function for adding [decorations](https://docs.slatejs.org/concepts/08-rendering#decorations). See these examples to learn how it works:

- [Search Highlighting](https://github.com/ianstormtaylor/slate/blob/master/site/examples/search-highlighting.js)
- [Markdown Preview](https://github.com/ianstormtaylor/slate/blob/master/site/examples/markdown-preview.js)

### onDOMBeforeInput

<!-- TODO: this section needs to be written -->

_This section is a work in progress_

## Plugin Repo Structure

- components 
  - single **components.tsx** file (that can export multiple components)
  - **components** folder (with components re-exported from an index.ts file)
- helpers
  - single **helpers.ts** file (that can export multiple small helpers)
  - **components** folder (with complex helpers re-exported from an index.ts file)
- editorOverrides.ts
- decorate.ts
- renderLeaf.ts
- renderElement.ts
- onKeyDown.ts
- types.ts
- plugin.ts
- index.ts