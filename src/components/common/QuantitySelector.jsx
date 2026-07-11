import { HiMinus, HiPlus } from 'react-icons/hi'

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="rounded-l-xl px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
      >
        <HiMinus size={14} />
      </button>
      <span className="min-w-[40px] text-center text-sm font-semibold">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="rounded-r-xl px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
      >
        <HiPlus size={14} />
      </button>
    </div>
  )
}
