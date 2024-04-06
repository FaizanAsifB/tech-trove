import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type CategoryCardProps = {
  title: string
  imgUrl: string
}

const CategoryCard = ({ title, imgUrl }: CategoryCardProps) => {
  return (
    <Card className="relative min-h-[360px] bg-stone-200 flex items-end w-full">
      <CardContent className="grid w-full">
        <Image src={imgUrl} alt={title} fill className="object-cover" />
        <Button asChild className="z-10">
          <Link href={`/${title.toLowerCase()}`}>{title}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
export default CategoryCard
