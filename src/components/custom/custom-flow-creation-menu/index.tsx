import { Plus } from "lucide-react";

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

export default function CustomFlowCreationMenu() {
  return (
    <div className="absolute top-20 left-4 z-50">
      <Card className="w-[300px] bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-indigo-700">Node Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <span className="text-xs font-normal text-gray-400">Node template</span>
          <div className="space-y-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select node template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Templates</SelectLabel>
                  <SelectItem value="template1">Template 1</SelectItem>
                  <SelectItem value="template2">Template 2</SelectItem>
                  <SelectItem value="template3">Template 3</SelectItem>
                  <SelectItem value="template4">Template 4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-gray-400">Create Node</span>
            <Button size="icon" variant="ghost" className="cursor-pointer">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add node</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
