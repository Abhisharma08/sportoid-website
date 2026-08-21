import * as React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = 'Container'
