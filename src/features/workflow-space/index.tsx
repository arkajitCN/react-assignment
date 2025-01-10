import { RootState } from "@/store";
import { addWorkflow, setCurrentWorkflow, setEditing, updateEdges, updateNodes } from "@/store/slice/workflow-slice";
import {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  Node,
  Edge,
  Connection,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomNode from "./custom-node";

export default function Workflowspace() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const { workflows, currentWorkflow, isEditing } = useSelector((state: RootState) => state.workflow);
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

  const handleAdd = () => {
    setShowAddPopup(true);
  };

  const handleEdit = () => {
    dispatch(setEditing(true));
  };

  const handleSave = () => {
    dispatch(setEditing(false));
    console.log("Saving workflow:", currentWorkflowData);
  };

  const handleAddWorkflow = (name: string) => {
    const id = Date.now().toString();
    dispatch(addWorkflow({ id, name }));
    dispatch(setCurrentWorkflow(id));
    setShowAddPopup(false);
  };

  return (
    <main className="h-screen flex flex-col">
      {/* <Toolbar
        onAdd={handleAdd}
        onEdit={handleEdit}
        onSave={handleSave}
        isEditing={isEditing}
      /> */}
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
      {/* {showAddPopup && (
        <AddWorkflowPopup
          onAdd={handleAddWorkflow}
          onClose={() => setShowAddPopup(false)}
        />
      )} */}
    </main>
  );
}
