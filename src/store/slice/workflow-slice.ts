import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "@xyflow/react";

interface WorkflowState {
  workflows: { id: string; name: string; nodes: Node[]; edges: Edge[] }[];
  currentWorkflow: string | null;
  isEditing: boolean;
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Default Node" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const initialState: WorkflowState = {
  workflows: [],
  currentWorkflow: null,
  isEditing: false,
};

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

export const { addWorkflow, setCurrentWorkflow, updateNodes, updateEdges, setEditing } =
  workflowSlice.actions;
export default workflowSlice.reducer;
