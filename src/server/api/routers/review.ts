import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { reviews } from "~/server/db/schema";
import { reviewSchema, reviewUpdateSchema } from "~/validations/review";

export const reviewRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.reviews.findMany({
      orderBy: desc(reviews.rating)
    });
  }),
  create: publicProcedure
    .input(reviewSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(reviews).values({
        name: input.name,
        userId: "1",
        rating: input.rating
      })
    }),
  update: publicProcedure
    .input(reviewUpdateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.update(reviews).set({
        name: input.name,
        rating: input.rating
      }).where(
        eq(reviews.id, input.id)
      )
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(reviews).where(
        eq(reviews.id, input.id)
      )
    })
})
