import { NodeEntry, Range, Editor } from "slate"
import { RenderElementProps, RenderLeafProps } from "slate-react"

// Basic plugin
interface PluginOptions {}

// Factory Generic for creating Plugin Components
type Factory<T> = (options?: PluginOptions) => T

// Plugin Component Types
export type EditorOverrides<E = Editor> = (editor: E) => E
export type OnDOMBeforeInput<E = Editor> = (event: Event, editor: E) => void
export type OnKeyDown<E = Editor> = (e: any, editor: E, props?: any) => void
export type RenderElement = (props: RenderElementProps) => JSX.Element | undefined
export type RenderLeaf = (props: RenderLeafProps) => JSX.Element
export type Decorate = (entry: NodeEntry) => Range[]

// Plugin Component Factory Types
export type EditorOverridesFactory<E = Editor> = Factory<EditorOverrides<E>>
export type OnDOMBeforeInputFactory<E = Editor> = Factory<OnDOMBeforeInput<E>>
export type OnKeyDownFactory<E = Editor> = Factory<OnKeyDown<E>>
export type RenderElementFactory = Factory<RenderElement>
export type RenderLeafFactory = Factory<RenderLeaf>
export type DecorateFactory = Factory<Decorate>

// Plugin Options
export interface SlatePlugin<E = Editor> {
  editorOverrides?: EditorOverrides<E>
  onDOMBeforeInput?: OnDOMBeforeInput<E>
  onKeyDown?: OnKeyDown<E>
  renderElement?: RenderElement
  renderLeaf?: RenderLeaf
  decorate?: Decorate
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
export interface ElementPluginOptions extends PluginOptions, RenderElementOptions {}
export interface MarkPluginOptions extends PluginOptions, RenderInlineOptions {
  hotkey?: string
}
export interface InlinePluginOptions extends PluginOptions, RenderInlineOptions {
  hotkey?: string
}
