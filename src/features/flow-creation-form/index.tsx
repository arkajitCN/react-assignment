/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FlowCreationFormValues,
  flowCreationFormSchema,
} from "@/validations/form-schema";
import { Label } from "@/components/ui/label";
import CustomTextField from "@/components/custom/custom-text-field";
import { Input } from "@/components/ui/input";

const FlowCreationForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit: formSubmitHandler,
    formState: { errors },
  } = useForm<FlowCreationFormValues>({
    resolver: zodResolver(flowCreationFormSchema),
    defaultValues: {
      type: "",
      form: "",
      image: "",
      workflowName: "",
      workflowTemplate: "",
      owner: "",
      description: "",
      lifecycle: "",
      comments: "",
      estimated: "",
      tags: "",
    },
  });

  // ! ===================== (HANDLE CHANGE AND HANLE SUBMIT FUNCTIONS) ======================

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmitRequest = (data: FlowCreationFormValues) => {
    console.log("data", data);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Open Modal</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[780px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-slate-600">
              Quick Create
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-6"
            onSubmit={formSubmitHandler(handleFormSubmitRequest)}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="select1">Type</Label>
                <CustomTextField
                  name="type"
                  control={control}
                  options={[
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" },
                    { value: "option3", label: "Option 3" },
                  ]}
                  placeholder="Workflow Template"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="select2">Form</Label>
                <CustomTextField
                  name="form"
                  control={control}
                  options={[
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" },
                    { value: "option3", label: "Option 3" },
                  ]}
                  placeholder="Default Workflow Template"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex items-center justify-center h-40 bg-gray-100 text-gray-500"
                    >
                      Click to upload image
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900" type="submit">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlowCreationForm;
