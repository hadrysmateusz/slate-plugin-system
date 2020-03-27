/* 
  Export all React components that should be exposed
  If you have multiple large components, split them into separate files 
  and re-export them from a 'components' folder
*/

import React from "react"
import { RenderElementProps } from "slate-react"

import { TYPE } from "./types"

export const Element = ({ attributes, children, element }: RenderElementProps) => (
  <div {...attributes} data-slate-type={TYPE}>
    {children}
  </div>
)
