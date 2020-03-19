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

An overview of all utilities and components provided by the core library can be found [here](./packages/core/README.md)

```js
import { Editable, useCreateEditor } from "@slate-plugin-system/core"
/* import all plugins from their respective packages here */

const plugins = [
	/* replace with any plugins you need */
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

A full reference for every property available inside a plugin can be found [here](./packages/core/PLUGIN_STRUCTURE.md)

## Migrating

slate-plugin-system is based on [slate-plugins-next](https://github.com/zbeyens/slate-plugins-next), which means any plugins from that project should be usable with slate-plugin-system, sometimes with minor tweaks required. The `editorOverrides` part of a plugin is the same as [slate's vanilla plugins](https://docs.slatejs.org/concepts/07-plugins) which means that any vanilla slate plugin only requires a simple wrapper, for example: `{ editorOverrides: withHistory }`.

There are many ways existing code can be integrated with this library, this flexibility can make migrating an existing codebase a lot easier.

- you can quickly create wrapper object for editorOverrides and other plugin components and add them to your plugins array
- you can wrap the editor object returned by `useCreateEditor` with [vanilla Slate plugins](https://docs.slatejs.org/concepts/07-plugins) like you would in any other slate project
- you can pass multiple components of a slate plugin like `onKeyDown`, `decorate`, `renderLeaf` etc. into the Editable component as props

This is an example using all of the above approaches. Keep in mind this is just for demonstration purposes and it's recommended to convert all of your legacy plugins and other plugin elements into full slate-plugin-system plugins.

```js
import { withHistory } from "slate-history"
/* the following plugins aren't real ;) */
import { withList, renderList } from "some-list-plugin"
import { renderHeadings } from "some-headings-plugin"
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
	const [value, setValue] = useState(/* initialValue */)
	const onChange = (value) => setValue(value)
	let editor = useCreateEditor(plugins)
	editor = withSomething(editor)

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<Editable plugins={plugins} renderElement={[renderHeadings({ levels: 6 })]} />
		</Slate>
	)
}
```
