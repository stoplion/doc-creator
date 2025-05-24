import {
  PanelResizeHandle as BasePanelResizeHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels"

export { Panel, PanelGroup }

export function PanelResizeHandle() {
  return (
    <BasePanelResizeHandle className="w-1 bg-zinc-700 hover:bg-zinc-600 transition-colors">
      <div className="w-1 h-full bg-zinc-600 hover:bg-zinc-500" />
    </BasePanelResizeHandle>
  )
}
