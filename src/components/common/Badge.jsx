const colorMap = {
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  brand: 'bg-brand-100 text-brand-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  blue: 'bg-blue-100 text-blue-700',
}

const statusMap = {
  delivered: 'green',
  shipped: 'blue',
  processing: 'yellow',
  pending: 'gray',
  cancelled: 'red',
  confirmed: 'green',
}

export default function Badge({ children, color, status, className = '' }) {
  const resolvedColor = color || statusMap[status] || 'gray'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorMap[resolvedColor]} ${className}`}>
      {children || status}
    </span>
  )
}
