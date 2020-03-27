import { Editor } from "slate"
import { OnKeyDownFactory } from "@slate-plugin-system/core"
import { PluginOptions } from "./types"

export const onKeyDownPlugin: OnKeyDownFactory = (options: PluginOptions = {}) => (
  event: KeyboardEvent,
  editor: Editor
) => {}
