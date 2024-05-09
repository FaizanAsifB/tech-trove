import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  title: string;
  imgUrl: string;
};

const CategoryCard = ({ title, imgUrl }: CategoryCardProps) => {
  return (
    <Card className="relative flex min-h-[360px] w-full items-end bg-secondary">
      <CardContent className="grid w-full">
        <Image src={imgUrl} alt={title} fill className="object-cover" />
        <Button asChild className="z-10">
          <Link href={`/products?filter=${title} `}>{title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
export default CategoryCard;
