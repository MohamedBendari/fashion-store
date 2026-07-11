import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import Hero from '../../components/home/Hero'
import FeaturedProducts from '../../components/home/FeaturedProducts'
import NewCollection from '../../components/home/NewCollection'
import Categories from '../../components/home/Categories'
import BestSellers from '../../components/home/BestSellers'
import AboutBrand from '../../components/home/AboutBrand'
import InstagramGallery from '../../components/home/InstagramGallery'
import Testimonials from '../../components/home/Testimonials'
import Newsletter from '../../components/home/Newsletter'
import { FREE_DELIVERY_MIN } from '../../config/store'

export default function Home() {
  const { t } = useTranslation()

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>{t('common.storeName')} — {t('common.tagline')}</title>
      </Helmet>
      <Hero onShop={scrollToProducts} />
      <p className="mt-4 text-center text-sm text-gray-500">
        🚚 {t('home.freeDelivery')} {FREE_DELIVERY_MIN} {t('common.egp')}
      </p>
      <div id="products">
        <FeaturedProducts />
      </div>
      <NewCollection />
      <Categories />
      <BestSellers />
      <AboutBrand />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  )
}
