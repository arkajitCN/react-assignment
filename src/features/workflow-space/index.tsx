import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store";
import {
  addEdge,
  addNode,
  deleteEdge,
  deleteNode,
  updateNode,
  updateNodePosition,
} from "@/store/flow/slice";
import { NodeType } from "@/store/flow/state";
import {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Connection,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useDispatch, useSelector } from "react-redux";

export default function Workflowspace() {
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const dispatch = useDispatch<AppDispatch>();

  const onConnect = (connection: Connection) => {
    dispatch(
      addEdge({
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
      })
    );
  };

  const handleAddNodes = () => {
    const newNode: NodeType = {
      id: `${Date.now()}`,
      data: { label: "New Node" },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    dispatch(addNode(newNode));
  };

  const updateNodeLabel = (nodeId: string, newLabel: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  const moveNode = (nodeId: string, newX: number, newY: number) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, position: { x: newX, y: newY } } : node
      )
    );
  };

  const onNodesChange: (changes: any[]) => void = (changes) => {
    changes.forEach((change) => {
      if (change.type === "remove") {
        dispatch(deleteNode(change.id));
      } else if (change.type === "position" && change.position) {
        dispatch(
          updateNodePosition({
            id: change.id,
            position: change.position,
          })
        );
      }
    });
  };

  const onEdgesChange: (changes: any[]) => void = (changes) => {
    changes.forEach((change) => {
      if (change.type === "remove") {
        dispatch(deleteEdge(change.id));
      }
    });
  };

  return (
    <div className="h-[90vh] w-full flex flex-col">
      <Button className="w-fit" onClick={() => handleAddNodes()}>
        Add Node
      </Button>
      <Button className="w-fit" onClick={() => updateNodeLabel("1", "Updated Label")}>
        Update Node 1
      </Button>
      <Button className="w-fit" onClick={() => deleteNode("2")}>
        Delete Node 2
      </Button>
      <Button className="w-fit" onClick={() => moveNode("3", 500, 200)}>
        Move Node 3
      </Button>

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
