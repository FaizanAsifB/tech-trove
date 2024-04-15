import CategoryCards from './components/category-cards'
import FeaturedProductsSection from './components/featured-products-section'
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
      <FeaturedProductsSection currentPage={currentPage} />
      <ShopFeatures />
    </>
  )
}
