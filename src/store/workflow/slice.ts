import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "@xyflow/react";
import { initialEdges, initialNodes, initialState } from "./initial-state";

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addWorkflow: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.workflows.push({
        ...action.payload,
        nodes: initialNodes,
        edges: initialEdges,
      });
    },
    setCurrentWorkflow: (state, action: PayloadAction<string>) => {
      state.currentWorkflow = action.payload;
    },
    updateNodes: (state, action: PayloadAction<Node[]>) => {
      const workflow = state.workflows.find((w) => w.id === state.currentWorkflow);
      if (workflow) {
        workflow.nodes = action.payload;
      }
    },
    updateEdges: (state, action: PayloadAction<Edge[]>) => {
      const workflow = state.workflows.find((w) => w.id === state.currentWorkflow);
      if (workflow) {
        workflow.edges = action.payload;
      }
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { addWorkflow, setCurrentWorkflow, updateNodes, updateEdges, setEditing } = workflowSlice.actions;
export default workflowSlice.reducer;
