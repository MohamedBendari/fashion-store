import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'
import { testimonials } from '../../data/mockData'
import Rating from '../common/Rating'

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <section className="mt-16">
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('home.customersSay')}
          </h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <Rating value={item.rating} size={16} />
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  &ldquo;{lang === 'ar' ? item.textAr : item.textEn}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={item.avatar} alt={lang === 'ar' ? item.nameAr : item.nameEn} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{lang === 'ar' ? item.nameAr : item.nameEn}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
