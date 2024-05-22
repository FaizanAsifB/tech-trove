"use server";

import { Image } from "@prisma/client";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CategoryFormSchema,
  CategoryFormValues,
  ProductFormSchema,
  ProductFormValues,
  ProductUpdateSchema,
} from "./definitions";
import prismaDb from "./prisma";

export async function createCategory(formData: CategoryFormValues) {
  const validatedFields = await CategoryFormSchema.safeParseAsync(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Category.",
    };
  }

  const { title, images, navPos } = validatedFields.data;

  try {
    await prismaDb.category.create({
      data: {
        title,
        navPos,
        images: {
          createMany: {
            data: images.map((image) => ({ ...image, productId: null })),
          },
        },
      },
      include: {
        images: true,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Category.",
    };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function createProduct(formData: ProductFormValues) {
  const validatedFields = ProductFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const { images, ...productInfo } = validatedFields.data;

  try {
    await prismaDb.product.create({
      data: {
        ...productInfo,
        images: {
          createMany: {
            data: images.map((image) => ({ ...image, categoryId: null })),
          },
        },
      },
      include: {
        images: true,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateCategory(
  id: string,
  formData: {
    title: string;
    images: { url: string; public_id: string; isPrimary: boolean }[];
  },
  initialImages: Image[],
) {
  const validatedFields = await CategoryFormSchema.safeParseAsync(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Category.",
    };
  }
  const { title, images } = validatedFields.data;

  const newImages = images.filter(
    (img) =>
      initialImages.find(
        (initialImg) => initialImg.public_id === img.public_id,
      ) === undefined,
  );

  try {
    await prismaDb.category.update({
      where: {
        id,
      },
      data: {
        title,
        images: {
          createMany: {
            data: newImages.map((image) => ({ ...image, productId: null })),
          },
        },
      },
      include: {
        images: true,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Category." };
  }
  revalidatePath("/admin/categories");
}

export async function updateProduct(id: string, formData: ProductFormValues) {
  const validatedFields = ProductUpdateSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const { images, ...productInfo } = validatedFields.data;

  try {
    await prismaDb.product.update({
      where: {
        id,
      },
      data: {
        ...productInfo,
        images: {
          createMany: {
            data: images.map((image) => ({ ...image, categoryId: null })),
          },
        },
      },
      include: {
        images: true,
      },
    });
    revalidatePath("/admin/products");
  } catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prismaDb.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Delete Category." };
  }
}
export async function deleteProduct(id: string) {
  try {
    await prismaDb.product.delete({
      where: {
        id,
      },
    });
    // revalidatePath("/admin/products");
    // redirect("/admin/products");
  } catch (error) {
    return { message: "Database Error: Failed to Delete Category." };
  }
}

export async function toggleIsPrimary(public_id: string, categoryId: string) {
  try {
    await prismaDb.image.update({
      where: {
        public_id,
      },
      data: {
        isPrimary: true,
      },
    });
    await prismaDb.image.updateMany({
      where: { public_id: { not: public_id }, categoryId },
      data: { isPrimary: false },
    });

    revalidatePath("/admin/categories");
    return { message: "Primary image updated." };
  } catch (error) {
    return { message: "Database Error: Failed to update primary image." };
  }
}

// Import the Cloudinary module

// Configure Cloudinary with your account credentials
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function deleteCloudImage(public_id: string) {
  try {
    await prismaDb.image.delete({
      where: {
        public_id,
      },
    });
    await cloudinary.v2.uploader.destroy(public_id);
  } catch (error) {
    return { message: "Internal server error" };
  }
}
