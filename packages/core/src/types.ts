import { NodeEntry, Range } from "slate"
import { RenderElementProps, RenderLeafProps, ReactEditor } from "slate-react"

// Factory Generic for creating Plugin Components
type Factory<T> = (options?: Object) => T

// Plugin Component Types
export type EditorOverrides = (editor: ReactEditor) => ReactEditor
export type OnKeyDown = (e: any, editor: ReactEditor, props?: any) => void
export type RenderElement = (props: RenderElementProps) => JSX.Element | undefined
export type RenderLeaf = (props: RenderLeafProps) => JSX.Element
export type Decorate = (entry: NodeEntry) => Range[]
export type OnDOMBeforeInput = (event: Event, editor: ReactEditor) => void

// Plugin Component Factory Types
export type EditorOverridesFactory = Factory<EditorOverrides>
export type OnKeyDownFactory = Factory<OnKeyDown>
export type RenderElementFactory = Factory<RenderElement>
export type RenderLeafFactory = Factory<RenderLeaf>
export type DecorateFactory = Factory<Decorate>
export type OnDOMBeforeInputFactory = Factory<OnDOMBeforeInput>

// Plugin Options
export interface SlatePlugin {
  decorate?: Decorate
  onDOMBeforeInput?: OnDOMBeforeInput
  renderElement?: RenderElement
  renderLeaf?: RenderLeaf
  onKeyDown?: OnKeyDown
  editorOverrides?: EditorOverrides
}

// GetRender Options
export interface GetRenderLeafOptions {
  type: string
  component: any
}
export interface GetRenderElementOptions {
  type: string
  component: any
}

// Render Options
export interface RenderElementOptions {
  component?: any
}
export interface RenderLeafOptions {
  component?: any
}
export interface RenderInlineOptions {
  component?: any
}

// Plugin Options
export interface ElementPluginOptions extends RenderElementOptions {}
export interface MarkPluginOptions extends RenderInlineOptions {
  hotkey?: string
}
export interface InlinePluginOptions extends RenderInlineOptions {
  hotkey?: string
}
