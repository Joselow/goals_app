import type { Goal } from "@/types";
import { z } from "zod";

const GoalScheme = z.object({
  name: z.string({
    invalid_type_error: 'title mus be a string',
    required_error: 'title is required'
  }).min(1),
  tasks: z.array(
    z.object({
      name: z.string(),
      priority: z.boolean(),
    })).optional(),
  notes: z.array(
    z.object({
      content: z.string(),
    })).optional(),
  strict: z.boolean().optional(),
  deadlines: z.array(
    z.object({
      num: z.number(),
      text: z.string(),
      completed: z.boolean(),
    })
  ).or(z.object({
    num: z.number(),
    text: z.string(),
    completed: z.boolean(),
  }))
  .optional(),
  comment: z.string(),
  completed: z.boolean(),
})


export const validationCreateGoal = (object: Goal) => {
  return GoalScheme.safeParse(object)
} 