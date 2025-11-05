import type { PropsWithChildren, ReactNode } from 'react';

import { cn } from './ui/utils';

interface HighlightedSectionProps extends PropsWithChildren {
  className?: string;
  innerClassName?: string;
  headerSlot?: ReactNode;
}

/**
 * Shared wrapper that renders a warm, on-brand background panel matching the navigation hue.
 * Children are rendered inside a relative container so positioned overlays remain behind content.
 */
export function HighlightedSection({
  children,
  className,
  innerClassName,
  headerSlot,
}: HighlightedSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-[#b9472d]/35 bg-[#f2c4ae] shadow-[0_26px_80px_-38px_rgba(151,47,28,0.55)] p-6 md:p-8 lg:p-10',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(151,47,28,0.18) 0%, rgba(151,47,28,0.06) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(255,255,255,0.4), transparent 58%)',
        }}
      />
      {headerSlot}
      <div className={cn('relative', innerClassName)}>{children}</div>
    </section>
  );
}

