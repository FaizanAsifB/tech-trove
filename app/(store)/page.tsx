import CategoryCards from './components/category-cards'
import FeaturedProducts from './components/featured-products'
import Hero from './components/hero'
import ShopFeatures from './components/shop-features'

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const currentPage = Number(searchParams['feature-page'] || 1)
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedProducts currentPage={currentPage} />
      <ShopFeatures />
    </>
  )
}
