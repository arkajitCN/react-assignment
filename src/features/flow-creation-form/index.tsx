/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSelectField from "@/components/custom/custom-select-field";
import CustomTextField from "@/components/custom/custom-text-field";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FlowCreationFormValues, flowCreationFormSchema } from "@/validations/form-schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { addWorkflow, setCurrentWorkflow } from "@/store/workflow/slice";
import { Node } from "@xyflow/react";

type FlowCreationFormProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FlowCreationForm: React.FC<FlowCreationFormProps> = ({ isOpen, setIsOpen }) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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
      tags: [],
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

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      setValue("tags", newTags);
    }
  };

  const handleTagRemove = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    setValue("tags", newTags);
  };

  const handleFormSubmitRequest = (data: FlowCreationFormValues) => {
    // Generate a unique ID for the workflow
    const id = Date.now().toString();

    const defaultNode: Node = {
      id: Date.now().toString(),
      type: "input",
      data: { label: "Input Node" }, // Node data
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Center of the screen
      draggable: true,
    };

    // Prepare the flow data
    const flowData = {
      id,
      name: data.workflowName.trim(),
      nodes: [defaultNode],
      edges: [],
    };

    // Dispatch actions to add the workflow and set it as current
    dispatch(addWorkflow(flowData));
    dispatch(setCurrentWorkflow(id));

    // Close the modal or form
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <DialogTrigger asChild>
          <Button>Open Modal</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[780px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-slate-600">Quick Create</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleFormSubmitRequest)} className="space-y-6">
            {/* // ! =================== ROW 01 ======================================*/}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="select1">Type</Label>
                <CustomSelectField
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
                <CustomSelectField
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
            {/* // ! =================== ROW 02 ====================================== */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                  <Input id="image" type="file" onChange={handleImageUpload} className="hidden" />
                  {image ? (
                    <img src={image} alt="Preview" className="max-w-full h-auto" />
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
              <div className="space-y-2">
                <div>
                  <Label htmlFor="workflowName">Name</Label>
                  <CustomTextField control={control} name={"workflowName"} placeholder="Enter name" />
                  {/* {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                  )} */}
                </div>
                <div>
                  <Label htmlFor="workflowTemplate">Workflow Template Name</Label>
                  <CustomTextField control={control} name={"workflowTemplate"} placeholder="Enter template name" />
                  {/* <Controller
                    name="workflowTemplate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="workflowTemplate"
                        placeholder="Enter workflow template name"
                        {...field}
                      />
                    )}
                  /> */}
                  {errors.workflowTemplate && (
                    <span className="text-red-500 text-sm">{errors.workflowTemplate.message}</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="owner">Owner</Label>
                  <CustomSelectField
                    name="owner"
                    control={control}
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                      { value: "option3", label: "Option 3" },
                    ]}
                    placeholder="Default Workflow Template"
                  />
                  {/* <Controller
                    name="owner"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="owner">
                          <SelectValue placeholder="Select owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner1">Owner 1</SelectItem>
                          <SelectItem value="owner2">Owner 2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  /> */}
                  {errors.owner && <span className="text-red-500 text-sm">{errors.owner.message}</span>}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <CustomTextField control={control} name={"description"} placeholder="Enter description" />
                  {/* <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="description"
                        placeholder="Enter description"
                        {...field}
                      />
                    )}
                  /> */}
                  {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>
              </div>
            </div>
            {/* // ! =================== ROW 03 ====================================== */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <Label htmlFor="lifecycle">Lifecycle</Label>
                  <Controller
                    name="lifecycle"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="lifecycle">
                          <SelectValue placeholder="Select lifecycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lifecycle1">Lifecycle 1</SelectItem>
                          <SelectItem value="lifecycle2">Lifecycle 2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.lifecycle && <span className="text-red-500 text-sm">{errors.lifecycle.message}</span>}
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Controller
                    name="comments"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="comments">
                          <SelectValue placeholder="Select comments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comment1">Comment 1</SelectItem>
                          <SelectItem value="comment2">Comment 2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.comments && <span className="text-red-500 text-sm">{errors.comments.message}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="estimated">Estimated</Label>
                  <Controller
                    name="estimated"
                    control={control}
                    render={({ field }) => <Input id="estimated" placeholder="Enter estimated value" {...field} />}
                  />
                  {errors.estimated && <span className="text-red-500 text-sm">{errors.estimated.message}</span>}
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Select onValueChange={(value) => handleTagSelect(value)}>
                          <SelectTrigger id="tags">
                            <SelectValue placeholder="Select tags" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tag1">Tag 1</SelectItem>
                            <SelectItem value="tag2">Tag 2</SelectItem>
                            <SelectItem value="tag3">Tag 3</SelectItem>
                            <SelectItem value="tag4">Tag 4</SelectItem>
                            <SelectItem value="tag5">Tag 5</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedTags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm">
                              {tag}
                              <Button variant="ghost" className="h-auto p-0 ml-2" onClick={() => handleTagRemove(tag)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  />
                  {errors.tags && <span className="text-red-500 text-sm">{errors.tags.message}</span>}
                </div>
              </div>
            </div>
            {/* // ! =================== SUBMIT / CANCEL BUTTON =======================*/}
            <div className="flex justify-center space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-800 hover:bg-blue-900">
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
