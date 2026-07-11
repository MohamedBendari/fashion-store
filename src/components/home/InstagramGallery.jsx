import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { instagramPosts } from '../../data/mockData'

export default function InstagramGallery() {
  const { t } = useTranslation()

  return (
    <section className="mt-16">
      <div className="mb-6 text-center">
        <FaInstagram className="mx-auto mb-2 text-2xl text-brand-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          {t('home.followInstagram')}
        </h2>
        <p className="mt-1 text-sm text-gray-500">@fashionstore</p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3"
      >
        {instagramPosts.map((post) => (
          <motion.a
            key={post.id}
            variants={fadeInUp}
            href="#"
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
          >
            <img src={post.image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
              <span className="scale-0 text-sm font-semibold text-white transition group-hover:scale-100">
                ❤ {post.likes}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
