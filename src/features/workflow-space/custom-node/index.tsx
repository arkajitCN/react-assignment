// CustomNode Component
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200 hover:border-blue-400 transition-colors">
      <Handle type="target" position={Position.Top} className="w-4 h-4 bg-blue-400 hover:bg-blue-600" />
      <div className="font-bold text-gray-700 text-center">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 bg-blue-400 hover:bg-blue-600" />
    </div>
  );
};

export default CustomNode;
