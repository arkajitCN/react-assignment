import { RootState } from "@/store";
import { addWorkflow, setCurrentWorkflow, setEditing, updateEdges, updateNodes } from "@/store/workflow/slice";
import {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  Connection,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomNode from "./custom-node";

import "@xyflow/react/dist/style.css";

export default function Workflowspace() {
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const { workflows, currentWorkflow } = useSelector((state: RootState) => state.workflow);
  const currentWorkflowData = workflows.find((w) => w.id === currentWorkflow);

  const dispatch = useDispatch();
  const nodeTypes: NodeTypes = {
    custom: CustomNode,
  };

  const onNodesChange = useCallback(
    (changes: any) => {
      if (currentWorkflowData && isEditing) {
        dispatch(updateNodes(applyNodeChanges(changes, currentWorkflowData.nodes)));
      }
    },
    [currentWorkflowData, dispatch, isEditing]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      if (currentWorkflowData && isEditing) {
        dispatch(updateEdges(applyEdgeChanges(changes, currentWorkflowData.edges)));
      }
    },
    [currentWorkflowData, dispatch, isEditing]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (currentWorkflowData && isEditing) {
        dispatch(updateEdges(addEdge(connection, currentWorkflowData.edges)));
      }
    },
    [currentWorkflowData, dispatch, isEditing]
  );

  return (
    <div className="h-[90vh] w-full flex flex-col">
      <div className="flex-grow">
        {currentWorkflowData ? (
          <ReactFlow
            nodes={currentWorkflowData.nodes}
            edges={currentWorkflowData.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            nodesDraggable={isEditing}
            nodesConnectable={isEditing}
            elementsSelectable={isEditing}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p>No workflow selected. Click "Add" to create a new workflow.</p>
          </div>
        )}
      </div>
    </div>
  );
}
