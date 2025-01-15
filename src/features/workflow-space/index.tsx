import { RootState } from "@/store";
import { ReactFlowProvider, Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import { useSelector } from "react-redux";
import useWorkflow from "./hooks/use-workflow";

import "@xyflow/react/dist/style.css";

export default function Workflowspace() {
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const { onConnect, onEdgesChange, onNodesChange } = useWorkflow();

  return (
    <div className="h-[90vh] w-full flex flex-col">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
