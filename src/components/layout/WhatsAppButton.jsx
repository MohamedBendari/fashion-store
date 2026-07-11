import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { STORE_WHATSAPP } from '../../config/store'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${STORE_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    >
      <FaWhatsapp size={28} />
    </motion.a>
  )
}
