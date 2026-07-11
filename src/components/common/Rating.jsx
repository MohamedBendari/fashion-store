import { HiStar, HiOutlineStar } from 'react-icons/hi'

export default function Rating({ value, max = 5, size = 16, showCount, count }) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: max }).map((_, i) =>
          i < Math.round(value) ? (
            <HiStar key={i} size={size} className="text-yellow-400" />
          ) : (
            <HiOutlineStar key={i} size={size} className="text-gray-300" />
          )
        )}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </div>
  )
}
