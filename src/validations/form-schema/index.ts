import * as z from "zod";

export const flowCreationFormSchema = z.object({
  type: z.string().min(1, "Select 1 is required"),
  form: z.string().min(1, "Select 2 is required"),
  image: z.string().optional(),
  workflowName: z.string().min(1, "Name is required"),
  workflowTemplate: z.string().min(1, "Workflow template name is required"),
  owner: z.string().min(1, "Owner is required"),
  description: z.string().min(1, "Description is required"),
  lifecycle: z.string().min(1, "Lifecycle is required"),
  comments: z.string().min(1, "Comments are required"),
  estimated: z.string().min(1, "Estimated value is required"),
  tags: z.string().min(1, "At least one tag is required"),
});

export type FlowCreationFormValues = z.infer<typeof flowCreationFormSchema>;
