# Slate Plugin System Core

This package contains the core logic for creating and managing you slate plugins.

## Using plugins in your app

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

## Creating a plugin

A plugin is an object with various overrides for how slate functions, but it should always be shared as a function that creates said object using an `options` object that is passed to it as a parameter (even if no options are required).

A full reference for every property available inside a plugin can be found [here](./PLUGIN_STRUCTURE.md)

```ts
import { SlatePlugin } from "@slate-plugin-system/core"

import { withList } from "./editorOverrides"
import { renderElementList } from "./renderElement"
import { onKeyDownList } from "./onKeyDown"

interface ListPluginOptions {
	listTypes: string[]
}

export const ListPlugin = (options?: ListPluginOptions): SlatePlugin => ({
	renderElement: renderElementList(options),
	onKeyDown: onKeyDownList(options),
	editorOverrides: withList(options)
})
```

## API Reference

### useCreateEditor

A hook which takes an array of plugins as an argument and returns a memoized editor object.

- It uses `createEditor()` to create the basic slate editor object
- It then wraps it using `withReact()` (which means you don't have to add withReact to your plugins list)
- It then wraps it using all `editorOverrides` functions inside your plugins (from right to left)
- It memoizes the editor object using `useMemo()`

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
