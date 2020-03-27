import { SlatePlugin } from "@slate-plugin-system/core"
import { PluginOptions } from "./types"
import { onKeyDownPlugin } from "./onKeyDown"
import { withPlugin } from "./editorOverrides"

export default (options: PluginOptions = {}): SlatePlugin => ({
  onKeyDown: onKeyDownPlugin(options),
  editorOverrides: withPlugin(options)
})
