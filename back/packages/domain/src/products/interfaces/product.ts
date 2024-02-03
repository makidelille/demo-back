import { z } from 'zod';

export const productSchema = z
  .object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    quantity: z.number().nonnegative(),
    inventoryStatus: z.string(),
    category: z.string(),
    image: z.string().optional(),
    rating: z.number().optional(),
  })
  .strict();
export const updateProductSchema = productSchema.omit({ id: true }).partial();

export type IProduct = z.TypeOf<typeof productSchema>;
export type IUpdateProduct = z.TypeOf<typeof updateProductSchema>;
