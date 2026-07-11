import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, icon: Icon, className = '', ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </span>
        )}
        {props.type === 'textarea' ? (
          <textarea
            ref={ref}
            className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-brand-400 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''} ${className}`}
            {...props}
            type={undefined}
          />
        ) : (
          <input
            ref={ref}
            className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-brand-400 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''} ${className}`}
            {...props}
          />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
})

export default Input
