"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formSchema, FormValues } from "./schema";

const ModalForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select1: "",
      select2: "",
      image: "",
      name: "",
      workflowTemplate: "",
      owner: "",
      description: "",
      lifecycle: "",
      comments: "",
      estimated: "",
      tags: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
    setIsOpen(false);
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="select1">Select 1</Label>
              <Controller
                name="select1"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="select1">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.select1 && (
                <span className="text-red-500 text-sm">
                  {errors.select1.message}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="select2">Select 2</Label>
              <Controller
                name="select2"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="select2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.select2 && (
                <span className="text-red-500 text-sm">
                  {errors.select2.message}
                </span>
              )}
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
            <div className="space-y-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input id="name" placeholder="Enter name" {...field} />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="workflowTemplate">Workflow Template Name</Label>
                <Controller
                  name="workflowTemplate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="workflowTemplate"
                      placeholder="Enter workflow template name"
                      {...field}
                    />
                  )}
                />
                {errors.workflowTemplate && (
                  <span className="text-red-500 text-sm">
                    {errors.workflowTemplate.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="owner">Owner</Label>
                <Controller
                  name="owner"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="owner">
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner1">Owner 1</SelectItem>
                        <SelectItem value="owner2">Owner 2</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.owner && (
                  <span className="text-red-500 text-sm">
                    {errors.owner.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="description"
                      placeholder="Enter description"
                      {...field}
                    />
                  )}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <Label htmlFor="lifecycle">Lifecycle</Label>
                <Controller
                  name="lifecycle"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                {errors.lifecycle && (
                  <span className="text-red-500 text-sm">
                    {errors.lifecycle.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="comments">Comments</Label>
                <Controller
                  name="comments"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                {errors.comments && (
                  <span className="text-red-500 text-sm">
                    {errors.comments.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="estimated">Estimated</Label>
                <Controller
                  name="estimated"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="estimated"
                      placeholder="Enter estimated value"
                      {...field}
                    />
                  )}
                />
                {errors.estimated && (
                  <span className="text-red-500 text-sm">
                    {errors.estimated.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="tags">
                        <SelectValue placeholder="Select tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tag1">Tag 1</SelectItem>
                        <SelectItem value="tag2">Tag 2</SelectItem>
                        <SelectItem value="tag3">Tag 3</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tags && (
                  <span className="text-red-500 text-sm">
                    {errors.tags.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
