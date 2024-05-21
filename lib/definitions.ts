import { Category, Image, Product } from "@prisma/client";
import { z } from "zod";
import { fetchCategoryNavPos } from "./queries";

export const CategoryFormSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(50),
    navPos: z.coerce
      .number()
      .min(1, "Position must be greater than 0")
      .refine(
        async (value) => {
          const navPos = await fetchCategoryNavPos(value);
          return !navPos;
        },
        {
          message: "Position already in use",
        },
      ),
    images: z
      .object({
        url: z.string().url(),
        public_id: z.string(),
        isPrimary: z.boolean().default(false),
      })
      .array()
      .min(1, { message: "At least one image is required" })
      .max(3, { message: "Maximum of 3 images allowed" }),
  })
  .refine(
    (data) => {
      const primaryImages = data.images.filter((image) => image.isPrimary);
      return primaryImages.length === 1;
    },
    {
      message: "Exactly one image must be set as primary",
      path: ["images"],
    },
  );

export const CategoryTitleOnly = z.object({
  title: z.string().trim().min(1, "Title is required").max(50),
});

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

export const ProductFormSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(100),
    description: z.string().trim().min(1, "Description is required").max(2000),
    price: z.coerce
      .number()
      .min(1, "Price must be greater than 0")
      .max(1000000),
    isFeatured: z.boolean().default(false).optional(),
    categoryId: z.string().min(1, "Category is required"),
    images: z
      .object({
        url: z.string().url(),
        public_id: z.string(),
        isPrimary: z.boolean(),
      })
      .array()
      .min(1, { message: "At least one image is required" })
      .max(6, { message: "Maximum of 6 images allowed" }),
  })
  .refine(
    (data) => {
      const primaryImages = data.images.filter((image) => image.isPrimary);
      return primaryImages.length === 1;
    },
    {
      message: "Exactly one image must be set as primary",
      path: ["images"],
    },
  );

export const ProductUpdateSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  description: z.string().trim().min(1, "Description is required").max(2000),
  price: z.coerce.number().min(1, "Price must be greater than 0").max(1000000),
  isFeatured: z.boolean().default(false).optional(),
  categoryId: z.string().min(1, "Category is required"),
  images: z
    .object({
      url: z.string().url(),
      public_id: z.string(),
      isPrimary: z.boolean(),
    })
    .array()
    .max(6, { message: "Maximum of 6 images allowed" }),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;

export type FormattedProduct = Omit<Product, "price"> & { price: number };

export type ProductPageInfo = FormattedProduct & { images: Image[] } & {
  category: { id: string; title: string };
};

export type CartItem = ProductPageInfo & { quantity: number };
