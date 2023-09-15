import { z } from "zod"

export const reviewSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  rating: z.number({
    required_error: "Rating is required",
  }),
})

export type ReviewInput = z.infer<typeof reviewSchema>

export const reviewUpdateSchema = reviewSchema.extend({
  id: z.number({
    required_error: "ID is required",
  }),
})

export type ReviewUpdateInput = z.infer<typeof reviewUpdateSchema>
