import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "@xyflow/react";
import { Flows, initialNodes, initialState } from "./initial-state";

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addWorkflow: (state, action: PayloadAction<Flows>) => {
      const { id, name, nodes, edges } = action.payload;

      state.workflows.push({
        id,
        name,
        nodes: nodes || [],
        edges: edges || [],
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter((workflow) => workflow.id !== action.payload);
      if (state.currentWorkflow === action.payload) {
        state.currentWorkflow = null;
      }
    },
    renameWorkflow: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.id);
      if (workflow) {
        workflow.name = action.payload.name;
      }
    },
  },
});

export const {
  addWorkflow,
  setCurrentWorkflow,
  updateNodes,
  updateEdges,
  setEditing,
  setLoading,
  setError,
  deleteWorkflow,
  renameWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;
