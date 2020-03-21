import { useMemo } from "react"
import { createEditor } from "slate"
import { withReact } from "slate-react"

import { SlatePlugin } from "./types"

/**
 * Creates the editor object and applies all of the passed-in plugins
 * @param plugins array of plugins
 */

export const useCreateEditor = (plugins: SlatePlugin[] = []) => {
  return useMemo(()=>{
    let editor = withReact(createEditor())
    plugins.forEach(plugin=>{
			if (plugin.editorOverrides) {
        editor = plugin.editorOverrides(editor)
      }
		})
    return editor
  }, [])
}
