import { STORE_WHATSAPP } from '../config/store'
export function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${STORE_WHATSAPP}?text=${encoded}`
}

export function buildOrderMessage({ customer, items, subtotal, deliveryFee, total, lang }) {
  const isAr = lang === 'ar'
  const lines = []

  lines.push(isAr ? '🛍️ *طلب جديد من الموقع*' : '🛍️ *New website order*')
  lines.push('─────────────────')
  lines.push(isAr ? `👤 *العميل:* ${customer.name}` : `👤 *Customer:* ${customer.name}`)
  lines.push(isAr ? `📱 *الموبايل:* ${customer.phone}` : `📱 *Phone:* ${customer.phone}`)
  lines.push(isAr ? `📍 *العنوان:* ${customer.address}` : `📍 *Address:* ${customer.address}`)
  lines.push(isAr ? `🏙️ *المدينة:* ${customer.city}` : `🏙️ *City:* ${customer.city}`)
  if (customer.notes) {
    lines.push(isAr ? `📝 *ملاحظات:* ${customer.notes}` : `📝 *Notes:* ${customer.notes}`)
  }
  lines.push(isAr ? `💳 *الدفع:* عند الاستلام` : `💳 *Payment:* Cash on delivery`)
  lines.push('')
  lines.push(isAr ? '*المنتجات:*' : '*Products:*')

  items.forEach((item, idx) => {
    const name = isAr ? item.nameAr : item.nameEn
    lines.push(
      `${idx + 1}. ${name}`,
      `   ${isAr ? 'مقاس' : 'Size'}: ${item.size} | ${isAr ? 'لون' : 'Color'}: ${item.color} | x${item.qty}`,
      `   ${item.price * item.qty} ${isAr ? 'ج.م' : 'EGP'}`
    )
  })

  lines.push('─────────────────')
  lines.push(isAr ? `📦 *المجموع:* ${subtotal} ج.م` : `📦 *Subtotal:* ${subtotal} EGP`)
  lines.push(isAr ? `🚚 *التوصيل:* ${deliveryFee} ج.م` : `🚚 *Delivery:* ${deliveryFee} EGP`)
  lines.push(isAr ? `✅ *الإجمالي:* ${total} ج.م` : `✅ *Total:* ${total} EGP`)

  return lines.join('\n')
}
