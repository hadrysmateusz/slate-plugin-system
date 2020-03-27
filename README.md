# Slate Plugin System

> Currently in beta: Anything and everything in this document and codebase is subject to change

Plugins are self-contained plug-and-play packages containing everything needed to add some functionality to a slate app.

- overrides for methods on the `editor` object
- overrdies for `<Editable />` props like `renderElement` and `onKeyDown`
- helper functions that are needed for integrating the functionality with your app


## How to use

Install the core utilities by running:

```
npm install @slate-plugin-system/core
```

You will also need to install these peerDependencies:

```
npm install slate slate-react react react-dom
```

Next you will need to create or install some plugins. Plugins are functions that return an object containing all overrides necessary to implement some functionality. Some Plugins take an options object as an argument. 

> Currently there are no official plugins available, see the "Migrating" section, for more information on how you can use plugins, right now.

You should create an array containing all of your plugins which you will need to use in two places:

- the `useCreateEditor` hook
- the `<Editable />` component's `plugins` prop

**Important**: keep the plugins array constant by either declaring it outside a React component or in a useMemo hook.

### Basic usage example 

```js
import React, { useState } from "react"
import { Slate } from "slate-react"
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

> An overview of all utilities and components provided by the core library can be found [here](./core_utilities.md)

## Core API Reference

The `@slate-plugin-system/core` package exposes utilities for creating and consuming slate plugins.

> See the [full api reference](./core_api_reference.md) here

## Creating plugins

A plugin is an object with various overrides for how slate functions, but it should always be shared as a function that creates said object using an `options` object that is passed to it as a parameter (even if no options are required).

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

Plugins should not depend on the presence of another plugin (Unless explicitly specified and set as a peer dependency)

Any non-essential features that are used to integrate with other plugins but which don't depend on them to function, (e.g. deserialization) should be exposed as a helper that should be passed to the other plugin's options.

> All plugins using this system should have their own repositories. If you create a plugin using this system, create an issue or pull request to add a link to it from this repo. Work is in progress to create a template repository for plugins to simplify development. 

### Plugin Object Structure

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

> A full reference for every property available inside a plugin can be found [here](./plugin_structure.md)

### Plugin Repository Structure

Check out the [template directory](https://github.com/hadrysmateusz/slate-plugin-system.git/tree/master/packages/template") to learn how a repo should be structured. A template repository is coming soon.

### Creating Plugin components

> A guide for creating individual plugin components (renderElement, editorOverrides etc.) along with an explanation of useful helpers and type is coming soon.

## Migrating

slate-plugin-system is based on [slate-plugins-next](https://github.com/zbeyens/slate-plugins-next), which means any plugins from that project should be usable with slate-plugin-system, sometimes with minor tweaks required. The `editorOverrides` part of a plugin is the same as [slate's vanilla plugins](https://docs.slatejs.org/concepts/07-plugins) which means that any vanilla slate plugin only requires a simple wrapper, for example: `{ editorOverrides: withHistory }`.

There are many ways existing code can be integrated with this library, this flexibility can make migrating an existing codebase a lot easier.

- create a wrapper object for editorOverrides and other plugin components, and add them to your plugins array
- wrap the editor object returned by `useCreateEditor` with [vanilla Slate plugins](https://docs.slatejs.org/concepts/07-plugins) like you would in any other slate project
- you can pass multiple slate plugin components (`onKeyDown`, `decorate`, `renderLeaf` etc.) into the Editable component as props

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
