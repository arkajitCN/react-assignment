import { Bolt, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useWorkflow from "@/features/workflow-space/hooks/use-workflow";
import { useState } from "react";
import { NodeType } from "@/store/flow/state";
import { nanoid } from "nanoid";

export default function CustomFlowCreationMenu() {
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const { handleAddNode } = useWorkflow();

  const handleSelectTemplate = (val: string) => {
    const selected = nodes.find((node) => node.data.label === val);
    setSelectedNode(selected!);
  };

  const handleCreateNode = () => {
    selectedNode &&
      handleAddNode({
        id: nanoid(),
        data: { label: selectedNode.data.label + "-duplicate" },
        position: { x: 0, y: 0 },
      });
  };

  console.log("debug->", nodes);

  return (
    <div className="absolute top-10 left-4 z-10">
      <Card className="w-[300px] bg-white shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-indigo-700">Node Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <span className="text-xs font-semibold text-gray-400">Node template</span>
          <div className="space-y-2">
            <Select onValueChange={handleSelectTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select node template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{nodes.length > 0 ? "Node Templates" : "Templates not available"}</SelectLabel>
                  {nodes &&
                    nodes.map((node) => (
                      <SelectItem key={node.id} className="cursor-pointer" value={node.data.label}>
                        <span className="flex items-center gap-2 text-xs text-slate-700">
                          <Bolt size={12} />
                          {node.data.label}
                        </span>
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Create Node</span>
            <Button
              disabled={selectedNode ? false : true}
              onClick={handleCreateNode}
              size="icon"
              variant="ghost"
              className="cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add node</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
