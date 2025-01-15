/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { Connection, Edge, Node } from "@xyflow/react";
import {
  updateNodePosition,
  addEdge,
  addNode,
  deleteEdge,
  deleteNode,
  updateNode,
} from "@/store/flow/slice";
import { NodeType } from "@/store/flow/state";

// Custom hook to handle all flow actions
export default function useWorkflow() {
  const dispatch = useDispatch();

  // Handle node changes
  const onNodesChange = (changes: any[]) => {
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

  // Handle edge changes
  const onEdgesChange = (changes: any[]) => {
    changes.forEach((change) => {
      if (change.type === "remove") {
        dispatch(deleteEdge(change.id));
      }
    });
  };

  // Handle new edge connection
  const onConnect = (connection: Connection) => {
    const newEdge: Edge = {
      id: `${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
    };
    dispatch(addEdge(newEdge));
  };

  // Add a new node
  const handleAddNode = (node: NodeType) => {
    dispatch(addNode(node));
  };

  // Update node data
  const handleUpdateNode = (id: string, data: Partial<Node["data"]>) => {
    dispatch(updateNode({ id, data }));
  };

  // Delete a node
  const handleDeleteNode = (id: string) => {
    dispatch(deleteNode(id));
  };

  // Delete an edge
  const handleDeleteEdge = (id: string) => {
    dispatch(deleteEdge(id));
  };

  return {
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
    handleUpdateNode,
    handleDeleteNode,
    handleDeleteEdge,
  };
}
