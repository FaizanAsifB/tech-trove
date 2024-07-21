import { formatter } from "@/lib/utils";
import { Image as ImageDb, Product } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product & {
    images: ImageDb[];
  };
  isRelatedProduct?: boolean;
};

const ProductCard = ({
  product,
  isRelatedProduct = false,
}: ProductCardProps) => {
  return (
    <article>
      <Link href={`/products/${product.id}`} className="group space-y-3 ">
        <div className="relative min-h-40  overflow-clip rounded-sm bg-stone-100 ">
          <Image
            src={product.images.find((image) => image.isPrimary)!.url}
            fill
            alt={product.title}
            className="aspect-square max-w-full object-contain p-4 group-hover:scale-110"
          />
        </div>
        <h6 className={isRelatedProduct ? "text-sm" : ""}>{product.title}</h6>
        <div>
          <p className=" line-clamp-2  text-sm text-secondary-foreground">
            {product.description}
          </p>
          <span className="text-sm">
            {formatter.format(Number(product.price))}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
