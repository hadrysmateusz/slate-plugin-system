import { EditorOverridesFactory } from "@slate-plugin-system/core"
import { PluginOptions, PluginEditor } from "./types"

export const withPlugin: EditorOverridesFactory = (options: PluginOptions = {}) => (
  editor: PluginEditor
) => {
  return editor
}
