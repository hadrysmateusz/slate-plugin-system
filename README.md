## Disclaimer: Beta

This system is currently in beta, anything and everything in this document and codebase is subject to change

## Overview

Plugins should be self-contained plug-and-play packages containing everything needed to add given functionality to a slate app

- all overrides for props that should be added to the `<Editable />` component
- all overrides for methods on the `editor` object
- all other helpers that are needed for using the functionality in the app

They should not depend on the presence of another plugin (Unless clearly specified and set as a peer dependency)

Any non-essential features that are used to integrate with other plugins but which don't depend on them to function, (e.g. deserialization) should be exposed as a helper that should be passed to the other plugin's options. Or better yet, exposed in a different package (using a mono-repo or multi-repo approach)

All plugins using this system should have their own repositories, and can be linked from this one.

## Installing

Install the core utilities by running:

```
npm install @slate-plugin-system/core
```

You will also need to install these peerDependencies:

```
npm install slate slate-react react react-dom
```

## Get started

Plugins are functions that return an object containing all overrides necessary to implement some functionality. Some Plugins take an options object as an argument. You should create an array containing all of your plugins which you will need to use in two places:

- the `useCreateEditor` hook
- the `<Editable />` component's `plugins` prop

```js
/* array of all plugins you want */
const plugins = [
	BoldPlugin({ hotkey: "mod+b" }),
	ItalicPlugin({ hotkey: "mod+i" }),
	InlineCodePlugin({ hotkey: "mod+e" })
]

const App = () => {
	const [value, setValue] = useState(/* initialValue */)
	const editor = useCreateEditor(plugins)
	const onChange = (value) => setValue(value)

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<Editable plugins={plugins} />
		</Slate>
	)
}
```

**Important**: keep the plugins array constant by either declaring it outside a React component or in a useMemo hook.

## Plugin Structure

A plugin in its simplest form is just an object. It contains properties that override different parts of Slate's logic.

```ts
interface SlatePlugin {
	renderElement?: RenderElement
	renderLeaf?: RenderLeaf
	editorOverrides?: EditorOverrides
	onKeyDown?: OnKeyDown
	decorate?: Decorate
	onDOMBeforeInput?: OnDOMBeforeInput
}
```

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

## Usage Guide

An overview of what the core library provides

### useCreateEditor

A hook which takes an array of plugins as an argument and returns a memoized editor object.

- It uses `createEditor()` to create the basic slate editor object
- It then wraps it using `withReact()`
- It then wraps it using all `editorOverrides` functions inside your plugins (from right to left)
- It memoizes the editor object using `useMemo()`

It looks something like this:

```js
useMemo(() => withAllOtherPlugins(withReact(createEditor())), [])
```

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

## What about Vanilla Slate plugins?

If you have any other [vanilla Slate plugins](https://docs.slatejs.org/concepts/07-plugins) you can either wrap the editor object with them like you would in a regular Slate project, or create a new plugin for them (a simple object wrapper will suffice in most cases).

```js
import { withHistory } from "slate-history"
import { withList, renderList } from "some-list-plugin"
import { withSomething } from "some-other-plugin"

const HistoryPlugin = () => ({ editorOverrides: withHistory })
const ListPlugin = (options) => ({
	editorOverrides: withList(options),
	renderElement: renderList(options)
})

const plugins = [
	HistoryPlugin(),
	ListPlugin({ listTypes: ["bulleted", "numbered", "todo"] })
]

const App = () => {
	/* ... */
	let editor = useCreateEditor(plugins)
	editor = withSomething(editor)
	/* ... */
}
```
