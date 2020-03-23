import { Editor } from "slate"

import { EditorOverrides } from "../types"

export const composeOverrides = (overridesList: EditorOverrides[]): EditorOverrides => {
  return <T extends Editor>(editor: T) => {
    let e = editor
    overridesList.reverse().forEach((withOverrides) => {
      editor = withOverrides(editor)
    })
    return e
  }
}
