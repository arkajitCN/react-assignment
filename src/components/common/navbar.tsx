import { Pencil, Plus, Save } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="bg-gray-300/75 text-slate-800 shadow-lg sticky top-0 z-50 flex items-center justify-between px-6 py-2">
      <h1 className="font-themeFont text-lg text-blue-800 font-normal">Workflow Creation Space</h1>
      <div className="flex space-x-4">
        <Button
          variant={"outline"}
          className="font-themeFont font-normal text-xs hover:text-blue-600 rounded-lg px-4 py-2"
        >
          <Plus />
          Add
        </Button>
        <Button
          variant={"outline"}
          className="font-themeFont font-normal text-xs hover:text-orange-600 rounded-lg px-4 py-2"
        >
          <Pencil />
          Edit
        </Button>
        <Button
          variant={"outline"}
          className="font-themeFont bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white font-normal text-xs rounded-lg px-4 py-2"
        >
          <Save />
          Save
        </Button>
      </div>
    </div>
  );
}
