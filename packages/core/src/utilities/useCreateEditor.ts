import { useMemo } from "react"
import { createEditor, Editor } from "slate"
import { withReact } from "slate-react"

import { SlatePlugin } from "../types"

/**
 * Creates the editor object and applies all of the passed-in plugins
 * @param plugins array of plugins
 */

export const useCreateEditor = (plugins: SlatePlugin[] = []) => {
  return useMemo(()=>{
    let editor = withReact(createEditor()) as Editor
    // we reverse the array to execute functions from right to left
    plugins.reverse().forEach(plugin=>{
			if (plugin.editorOverrides) {
        editor = plugin.editorOverrides(editor)
      }
		})
    return editor
  }, [])
}
