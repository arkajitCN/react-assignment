import { Button } from "@/components/ui/button";
import {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useEdgesState,
  useNodesState,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: { label: "Default Node" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Another Node" },
    position: { x: 400, y: 100 },
  },
];

const initialEdges: Edge[] = [];

export default function Workflowspace() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));

  const handleAddNodes = () => {
    const newNode = {
      id: `${Date.now()}`, // A unique ID for the new node
      data: { label: "New Node" },
      position: { x: 300, y: 300 }, // Define the position
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const updateNodeLabel = (nodeId: string, newLabel: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  const deleteNode = (nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };

  const moveNode = (nodeId: string, newX: number, newY: number) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, position: { x: newX, y: newY } } : node
      )
    );
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
