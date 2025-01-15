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
export const initialState: FlowState = {
  nodes: [
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
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" },
  ],
};
