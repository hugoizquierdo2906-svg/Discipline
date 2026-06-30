import { cn } from '@/lib/cn'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** `inline` (default) renders <code>; `block` renders a <pre><code>. */
  variant?: 'inline' | 'block'
}

/** Code — monospace inline or block code display, tinted with surface tokens. */
export function Code({
  variant = 'inline',
  className,
  children,
  ...props
}: CodeProps) {
  if (variant === 'block') {
    return (
      <pre
        className={cn(
          'overflow-x-auto rounded-md bg-surface p-4 font-mono text-body-sm text-text',
          className,
        )}
      >
        <code {...props}>{children}</code>
      </pre>
    )
  }
  return (
    <code
      className={cn(
        'rounded-xs bg-surface px-1 py-0.5 font-mono text-body-sm text-text',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  )
}
