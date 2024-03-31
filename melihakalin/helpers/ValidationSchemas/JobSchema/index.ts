import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().optional(),
  category: z.string(),
  missions: z
    .array(
      z.object({
        task: z.string(),
        price: z.string(),
      })
    )
    .optional(),
});

export const jobValidator = async (body: {}) => {
  try {
    jobSchema.parse(body);
    return { message: true, error: null };
  } catch (error) {
    //@ts-expect-error "type error"
    console.log(error.issues);
    //@ts-expect-error "type error"
    return { message: false, error: error.issues };
  }
};
