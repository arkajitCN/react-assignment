import { useCallback, useState } from "react";
import { RootState } from "@/store";
import { ReactFlowProvider, Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import { useSelector } from "react-redux";
import useWorkflow from "./hooks/use-workflow";
import CustomNode from "./custom-node";

import "@xyflow/react/dist/style.css";

export default function Workflowspace() {
  const [isEditing] = useState<boolean>(false);
  const { onConnect, onEdgesChange, onNodesChange } = useWorkflow();
  const nodeTypes = { textUpdater: CustomNode };

  // config variables
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const memoizedNodeChange = useCallback(onNodesChange, [onNodesChange]);
  const memoizedEdgeChange = useCallback(onEdgesChange, [onNodesChange]);
  const memoizedOnConnect = useCallback(onConnect, [onConnect]);

  return (
    <div className="h-[90vh] w-full flex flex-col">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={memoizedNodeChange}
          onEdgesChange={memoizedEdgeChange}
          onConnect={memoizedOnConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <MiniMap />
          <Controls />
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <p className="text-2xl font-bold text-indigo-700">
                No nodes available. Start adding nodes to see your workflow!
              </p>
            </div>
          )}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
