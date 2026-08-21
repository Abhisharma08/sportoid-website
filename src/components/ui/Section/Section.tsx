import * as React from 'react'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'dark-gray'
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className = '', children, variant = 'light', ...props }, ref) => {
    const variants = {
      light: 'bg-light text-dark',
      dark: 'bg-dark text-white',
      'dark-gray': 'bg-dark-gray text-white',
    }

    return (
      <section
        ref={ref}
        className={`py-16 md:py-24 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </section>
    )
  }
)
Section.displayName = 'Section'
