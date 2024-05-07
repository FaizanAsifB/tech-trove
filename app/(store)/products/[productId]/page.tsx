import prismaDb from "@/lib/prisma";
import { fetchProduct } from "@/lib/queries";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import ProductCard from "../../_components/product-card";
import AddToCart from "../_components/add-to-cart";

const ProductsPage = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const product = await fetchProduct(params.productId);
  if (!product) return null;

  const relatedProducts = await prismaDb.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 3,
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedProduct = {
    ...product,
    price: parseFloat(String(product?.price)),
  };

  return (
    <section className="mt-8">
      <div className="container space-y-24">
        <article className="grid gap-12 md:grid-cols-2 lg:gap-20 ">
          <div className="relative min-h-[400px] rounded-sm bg-stone-100">
            <Image
              src={product.images[0].url}
              fill
              alt={product.title}
              className="aspect-square max-w-full object-contain p-6 "
            />
          </div>
          <div className="flex flex-col py-4 ">
            <div className="space-y-2 ">
              <h4 className="font-bold">{product.title}</h4>
              <small className="inline-block">{product.category.title}</small>
              <p className="text-sm">
                {formatter.format(Number(product.price))}
              </p>
            </div>
            <div className="mb-4 mt-8 flex-1 space-y-1">
              <h6>Description</h6>
              <p className="text-secondary-foreground">{product.description}</p>
            </div>
            <AddToCart product={formattedProduct} />
          </div>
        </article>
        <div>
          <h5>Related Products</h5>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isRelatedProduct
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
