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
import useWorkflow from "../workflow-space/hooks/use-workflow";
import { nanoid } from "nanoid";

type FlowCreationFormProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FlowCreationForm: React.FC<FlowCreationFormProps> = ({ isOpen, setIsOpen }) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { handleAddNode } = useWorkflow();

  const {
    reset,
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
    console.log("HANDLE UPLOAD => ", event.target.files);
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
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

  const handleResetFormFields = () => {
    reset();
    setImage(null);
    setSelectedTags([]);
  };

  const handleImageRemove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("CHECK CLEAR=>");
    event.stopPropagation();
    setImage(null);
    setValue("image", "");
  };

  const handleFormSubmitRequest = (data: FlowCreationFormValues) => {
    handleAddNode({
      id: nanoid(),
      data: { label: data.workflowName },
      position: { x: 100, y: 250 },
    });

    handleResetFormFields();
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md p-4 relative">
                  <Input id="image" type="file" onChange={handleImageUpload} className="hidden" />
                  {image && (
                    <div
                      onClick={handleImageRemove}
                      className="absolute top-0 right-0 m-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-red-600"
                      aria-label="Clear Image"
                    >
                      <X width={14} />
                    </div>
                  )}

                  {image ? (
                    <div>
                      <img src={image} alt="Preview" className="w-40 h-40 object-cover rounded-md" />
                    </div>
                  ) : (
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex items-center justify-center w-40 h-40 bg-gray-100 text-gray-500 rounded-md"
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
                  {errors.workflowName && <span className="text-red-500 text-sm">{errors.workflowName.message}</span>}
                </div>
                <div>
                  <Label htmlFor="workflowTemplate">Workflow Template Name</Label>
                  <CustomTextField control={control} name={"workflowTemplate"} placeholder="Enter template name" />
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
                  {errors.owner && <span className="text-red-500 text-sm">{errors.owner.message}</span>}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <CustomTextField control={control} name={"description"} placeholder="Enter description" />
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
