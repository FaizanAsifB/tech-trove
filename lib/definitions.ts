import { z } from 'zod'

export const CategoryFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(50),
  images: z.object({ url: z.string().url(), public_id: z.string() }).array(),
})

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>
