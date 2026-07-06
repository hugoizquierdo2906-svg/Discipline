'use client'

import { useState } from 'react'

import { Heading } from '@/components/ui/heading'
import { Pagination } from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

function Section({
  title,
  description,
  children,
  'data-testid': dataTestId,
}: {
  title: string
  description?: string
  children: React.ReactNode
  'data-testid'?: string
}) {
  return (
    <section className="flex flex-col gap-3" data-testid={dataTestId}>
      <div className="flex flex-col gap-1">
        <Heading as="h3" level="h5">
          {title}
        </Heading>
        {description && (
          <Text size="body-sm" tone="secondary">
            {description}
          </Text>
        )}
      </div>
      <div className="rounded-lg border border-border bg-surface px-5 py-4">
        {children}
      </div>
    </section>
  )
}

/** A stateful Pagination instance — each demo section owns its own page. */
function StatefulPagination({
  totalPages,
  initialPage = 1,
  ...props
}: Omit<
  React.ComponentProps<typeof Pagination>,
  'page' | 'onPageChange' | 'totalPages'
> & { totalPages: number; initialPage?: number }) {
  const [page, setPage] = useState(initialPage)
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      {...props}
    />
  )
}

/** Pagination proof — every required demo case, on the standard page surface. */
export function PaginationScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level="h3">
          Pagination
        </Heading>
        <Text tone="secondary">
          Random-access navigation across a flat, ordered collection split into
          fixed-size pages — jump to page 47 of 900 without stepping through the
          46 before it.
        </Text>
      </div>

      <Section title="Minimal" data-testid="pagination-minimal">
        <StatefulPagination totalPages={5} initialPage={1} responsive={false} />
      </Section>

      <Separator />

      <Section title="First page" data-testid="pagination-first">
        <StatefulPagination
          totalPages={24}
          initialPage={1}
          responsive={false}
        />
      </Section>

      <Separator />

      <Section title="Middle page" data-testid="pagination-middle">
        <StatefulPagination
          totalPages={24}
          initialPage={12}
          responsive={false}
        />
      </Section>

      <Separator />

      <Section title="Last page" data-testid="pagination-last">
        <StatefulPagination
          totalPages={24}
          initialPage={24}
          responsive={false}
        />
      </Section>

      <Separator />

      <Section
        title="Large dataset"
        description="1000 pages — the collapse keeps the control the same width regardless of scale."
        data-testid="pagination-large"
      >
        <StatefulPagination
          totalPages={1000}
          initialPage={487}
          showFirst
          showLast
          responsive={false}
        />
      </Section>

      <Separator />

      <Section
        title="Few pages"
        description="Below the collapse threshold — every page renders, no ellipsis."
        data-testid="pagination-few"
      >
        <StatefulPagination totalPages={4} initialPage={2} responsive={false} />
      </Section>

      <Separator />

      <Section title="Disabled" data-testid="pagination-disabled">
        <Pagination
          page={5}
          totalPages={24}
          onPageChange={() => {}}
          disabled
          responsive={false}
        />
      </Section>

      <Separator />

      <Section
        title="Loading"
        description="State stays visible while a transition is in flight; every control disabled."
        data-testid="pagination-loading"
      >
        <Pagination
          page={5}
          totalPages={24}
          onPageChange={() => {}}
          loading
          responsive={false}
        />
      </Section>

      <Separator />

      <Section
        title="Compact"
        description='compact forces the "‹ page / total ›" reading regardless of viewport.'
        data-testid="pagination-compact"
      >
        <StatefulPagination totalPages={24} initialPage={7} compact />
      </Section>

      <Separator />

      <Section
        title="Different sibling counts"
        description="siblingCount 0, 1 (default) and 2 around the same current page."
        data-testid="pagination-siblings"
      >
        <div className="flex flex-col gap-4">
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            siblingCount={0}
            responsive={false}
          />
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            siblingCount={1}
            responsive={false}
          />
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            siblingCount={2}
            responsive={false}
          />
        </div>
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="Below the md breakpoint, the compact reading replaces the numbered row (CSS-only, no measuring). Resize the viewport to see it."
        data-testid="pagination-responsive"
      >
        <StatefulPagination totalPages={24} initialPage={7} />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on the wrapper — flexbox reverses natively; the chevrons flip via rtl:rotate-180.'
        data-testid="pagination-rtl"
      >
        <div dir="rtl">
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            responsive={false}
          />
        </div>
      </Section>

      <Separator />

      <Section
        title="Keyboard navigation"
        description="Every control is a real, independent button — native Tab order, Enter/Space activate. No composite widget, so no roving-tabindex or arrow-key model is needed."
        data-testid="pagination-keyboard"
      >
        <StatefulPagination
          totalPages={24}
          initialPage={5}
          responsive={false}
        />
      </Section>

      <Separator />

      <Section title="Sizes" data-testid="pagination-sizes">
        <div className="flex flex-col gap-4">
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            size="sm"
            responsive={false}
          />
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            size="md"
            responsive={false}
          />
          <StatefulPagination
            totalPages={24}
            initialPage={8}
            size="lg"
            responsive={false}
          />
        </div>
      </Section>
    </div>
  )
}
