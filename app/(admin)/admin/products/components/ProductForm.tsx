"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, toggleIsPrimary, updateProduct } from "@/lib/actions";
import { ProductFormSchema, ProductFormValues } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Image, Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductColumn } from "./columns";

type ProductFormProps = {
  initialData?: ProductColumn | null;
  categories: Pick<Category, "id" | "title">[];
};

const ProductForm = ({ initialData, categories }: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          title: "",
          description: "",
          price: 0,
          isFeatured: false,
          categoryId: "",
          images: [],
        },
  });

  async function handleSubmit(data: ProductFormValues) {
    try {
      if (initialData) {
        const newImages = data.images.filter(
          (newImage) =>
            !initialData.images
              .map((img) => img.public_id)
              .includes(newImage.public_id),
        );

        const updatedData = {
          ...data,
          images: newImages,
        };
        await updateProduct(params.productId as string, updatedData);
        const primaryImg = data.images.filter((img) => img.isPrimary)[0];
        if (
          primaryImg.public_id !==
          initialData.images.filter((img) => img.isPrimary)[0]?.public_id
        ) {
          await toggleIsPrimary(primaryImg.public_id, initialData.id);
        }
        router.push("/admin/products");
      } else {
        await createProduct(data);
      }
      toast.success(toastMessage);
    } catch (error) {
      toast.error("An Error Occurred");
      console.log(error);
    }
  }

  return (
    <>
      <Heading title={title} description={description} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Product price" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={form.formState.isSubmitting}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="space-x-1">
                <FormControl>
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormLabel>Featured</FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onChange={field.onChange}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting || form.formState.isSubmitSuccessful
            }
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default ProductForm;
