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
}

export const initialNodes: Node[] = [
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

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

export const initialState: WorkflowState = {
  workflows: [],
  currentWorkflow: null,
  isEditing: false,
};
