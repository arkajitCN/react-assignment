import { Node, Edge } from "@xyflow/react";

export interface Flows {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

export interface WorkflowState {
  workflows: Array<Flows>;
  currentWorkflow: string | null;
  isEditing: boolean;
  isLoading: boolean; // Added state for loading
  error: string | null; // Added state for error handling
}

export const initialNodes: Node[] = [];
export const initialEdges: Edge[] = [];

export const initialState: WorkflowState = {
  workflows: [],
  currentWorkflow: null,
  isEditing: false,
  isLoading: false,
  error: null,
};

// {
//     id: "1",
//     type: "input",
//     data: { label: "Input Node" },
//     position: { x: 250, y: 5 },
//     draggable: true,
//   },
//   {
//     id: "2",
//     data: { label: "Default Node" },
//     position: { x: 100, y: 100 },
//     draggable: true,
//   },
//   {
//     id: "3",
//     type: "output",
//     data: { label: "Output Node" },
//     position: { x: 250, y: 200 },
//     draggable: true,
//   },
