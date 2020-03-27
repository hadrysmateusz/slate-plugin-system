import { Editor } from "slate"

// Type of the element (Only useful for plugins that add new element types)
export const TYPE = "type"

// Interface for options your plugin will take
export interface PluginOptions {}

// A specialized Editor interface containing any overrides your plugin adds or depends on
export interface PluginEditor extends Editor {}