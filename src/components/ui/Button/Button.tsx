import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 ease-out will-change-transform cursor-pointer'

    const variants = {
      primary:
        'bg-primary text-white hover:bg-red-700 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(230,28,36,0.3),0_20px_48px_rgba(230,28,36,0.1)] active:scale-[0.98]',
      outline:
        'border-2 border-dark text-dark hover:bg-dark hover:text-white hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] active:scale-[0.98]',
      ghost:
        'bg-transparent text-dark hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs rounded',
      md: 'px-6 py-3 text-sm rounded-md',
      lg: 'px-8 py-4 text-base rounded-md',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
