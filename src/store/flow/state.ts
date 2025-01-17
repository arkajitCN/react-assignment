import { nanoid } from "nanoid";

export interface NodeType {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
}

export interface EdgeType {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface FlowState {
  nodes: NodeType[];
  edges: EdgeType[];
}

// Initial state
// export const initialState: FlowState = {
//   nodes: [
//     {
//       id: nanoid(),
//       data: { label: "Input Node" },
//       position: { x: 250, y: 0 },
//     },
//     {
//       id: nanoid(),
//       data: { label: "Default Node" },
//       position: { x: 100, y: 100 },
//     },
//     {
//       id: nanoid(),
//       data: { label: "Another Node" },
//       position: { x: 400, y: 100 },
//     },
//   ],
//   edges: [],
// };

export const initialState: FlowState = {
  nodes: [],
  edges: [],
};
