'use client'

import {
  CircleAlert,
  RefreshCw,
  ServerCrash,
  TriangleAlert,
  WifiOff,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { ErrorState } from '@/components/ui/error-state'
import { FullscreenOverlay } from '@/components/ui/fullscreen-overlay'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * Every example places ErrorState INSIDE a real Liquid Glass surface
 * (GlassCard / GlassPanel / Drawer / FullscreenOverlay) — never a dedicated
 * opaque card. ErrorState itself draws no surface; the glass material and
 * the wallpaper behind it are what make the "embedded on a real screen"
 * reading. The scene sits on the shared capture wallpaper so the glass reads.
 */
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
      {children}
    </section>
  )
}

const RetryButton = () => (
  <Button variant="secondary" leadingIcon={<Icon icon={RefreshCw} size="sm" />}>
    Try again
  </Button>
)

export function ErrorStateScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <GlassCard className="p-6">
          <Heading as="h2" level="h3">
            ErrorState
          </Heading>
          <Text tone="secondary" className="mt-2">
            A view or operation that failed to load — the user momentarily
            cannot proceed, and here is how to recover. ErrorState is CONTENT,
            not a surface: it draws no background, shadow, radius or material.
            Every example below lives inside a real Liquid Glass surface.
          </Text>
        </GlassCard>

        <Section title="Basic" data-testid="error-basic">
          <GlassCard>
            <ErrorState
              icon={<Icon icon={TriangleAlert} />}
              title="Something went wrong"
              description="We couldn't load this content. Please try again."
            />
          </GlassCard>
        </Section>

        <Section
          title="Retry"
          description="An icon, a title, a description, and a recovery action — inside a GlassCard."
          data-testid="error-retry"
        >
          <GlassCard>
            <ErrorState
              icon={<Icon icon={TriangleAlert} />}
              title="Couldn't load your dashboard"
              description="An unexpected error occurred while loading this page."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section
          title="Without action"
          description="Purely informative — no recovery offered."
          data-testid="error-no-action"
        >
          <GlassCard>
            <ErrorState
              icon={<Icon icon={CircleAlert} />}
              title="This content is unavailable"
              description="It may have been moved or deleted."
            />
          </GlassCard>
        </Section>

        <Section title="Small" data-testid="error-sm">
          <GlassCard>
            <ErrorState
              size="sm"
              icon={<Icon icon={TriangleAlert} />}
              title="Failed to load"
              description="Try again in a moment."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Medium" data-testid="error-md">
          <GlassCard>
            <ErrorState
              size="md"
              icon={<Icon icon={TriangleAlert} />}
              title="Failed to load"
              description="Try again in a moment."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Large" data-testid="error-lg">
          <GlassCard>
            <ErrorState
              size="lg"
              icon={<Icon icon={TriangleAlert} />}
              title="Failed to load"
              description="Try again in a moment."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Centered (default)" data-testid="error-center">
          <GlassPanel>
            <ErrorState
              align="center"
              icon={<Icon icon={ServerCrash} />}
              title="Server error"
              description="Our servers hit a snag. We're on it — please try again."
              action={<RetryButton />}
            />
          </GlassPanel>
        </Section>

        <Section
          title="Inline (left-aligned)"
          description='align="left" — follows dir automatically via logical start.'
          data-testid="error-inline"
        >
          <GlassCard>
            <ErrorState
              align="left"
              size="sm"
              icon={<Icon icon={CircleAlert} />}
              title="Couldn't refresh"
              description="Showing the last loaded version."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section
          title="Inside a Drawer (real surface)"
          description="ErrorState fills a real Drawer — no surface of its own."
          data-testid="error-drawer"
        >
          <Drawer
            title="Details"
            trigger={<Button variant="secondary">Open drawer</Button>}
          >
            <ErrorState
              icon={<Icon icon={TriangleAlert} />}
              title="Couldn't load details"
              description="This panel failed to load its content."
              action={<RetryButton />}
            />
          </Drawer>
        </Section>

        <Section
          title="Inside a FullscreenOverlay (real surface)"
          description="ErrorState fills the immersive surface directly."
          data-testid="error-overlay"
        >
          <FullscreenOverlay
            title="Report"
            trigger={<Button variant="secondary">Open overlay</Button>}
          >
            <div className="flex h-full items-center justify-center">
              <ErrorState
                size="lg"
                icon={<Icon icon={ServerCrash} />}
                title="Couldn't load the report"
                description="Something went wrong on our end. Please try again."
                action={<RetryButton />}
              />
            </div>
          </FullscreenOverlay>
        </Section>

        <Section title="Server error" data-testid="error-server">
          <GlassCard>
            <ErrorState
              icon={<Icon icon={ServerCrash} />}
              title="500 — Server error"
              description="Something broke on our end. This isn't your fault."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Load failed (network)" data-testid="error-network">
          <GlassCard>
            <ErrorState
              icon={<Icon icon={WifiOff} />}
              title="Connection lost"
              description="Check your network and try again."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Unknown error" data-testid="error-unknown">
          <GlassCard>
            <ErrorState
              icon={<Icon icon={CircleAlert} />}
              title="Something went wrong"
              description="An unknown error occurred. Please try again."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — text follows reading direction naturally.'
          data-testid="error-rtl"
        >
          <GlassCard>
            <div dir="rtl">
              <ErrorState
                icon={<Icon icon={ServerCrash} />}
                title="خطأ في الخادم"
                description="تعذّر تحميل المحتوى. يرجى المحاولة مرة أخرى."
                action={
                  <Button
                    variant="secondary"
                    leadingIcon={<Icon icon={RefreshCw} size="sm" />}
                  >
                    إعادة المحاولة
                  </Button>
                }
              />
            </div>
          </GlassCard>
        </Section>
      </div>
    </div>
  )
}
