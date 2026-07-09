'use client'

import { CloudOff, Plane, RefreshCw, WifiOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { FullscreenOverlay } from '@/components/ui/fullscreen-overlay'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Modal } from '@/components/ui/modal'
import { OfflineState } from '@/components/ui/offline-state'
import { Text } from '@/components/ui/text'

/**
 * Every example places OfflineState INSIDE a real Liquid Glass surface
 * (GlassCard / GlassPanel / Drawer / Modal / FullscreenOverlay) — never a
 * dedicated opaque card. OfflineState draws no surface; the glass material
 * and the wallpaper behind it produce the "embedded on a real screen"
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
        <Heading as="h3" level={5}>
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

export function OfflineStateScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <GlassCard className="p-6">
          <Heading as="h2" level={3}>
            OfflineState
          </Heading>
          <Text tone="secondary" className="mt-2">
            A momentary inability to reach content because the app has no
            network connection — not a server error, not empty data. Like
            ErrorState it is CONTENT, not a surface: it draws no background,
            shadow, radius or material. Every example lives inside a real Liquid
            Glass surface; the amber icon marks &ldquo;no network&rdquo;.
          </Text>
        </GlassCard>

        <Section title="Basic" data-testid="offline-basic">
          <GlassCard>
            <OfflineState
              icon={<Icon icon={WifiOff} />}
              title="You're offline"
              description="We couldn't reach the network. Check your connection."
            />
          </GlassCard>
        </Section>

        <Section
          title="Retry"
          description="An icon, a title, a description, and a recovery action — inside a GlassCard."
          data-testid="offline-retry"
        >
          <GlassCard>
            <OfflineState
              icon={<Icon icon={WifiOff} />}
              title="Connection lost"
              description="Your changes are saved and will sync once you're back online."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section
          title="Without action"
          description="Purely informative — waiting for the network to return."
          data-testid="offline-no-action"
        >
          <GlassCard>
            <OfflineState
              icon={<Icon icon={CloudOff} />}
              title="No connection"
              description="This content will load as soon as you're back online."
            />
          </GlassCard>
        </Section>

        <Section title="Small" data-testid="offline-sm">
          <GlassCard>
            <OfflineState
              size="sm"
              icon={<Icon icon={WifiOff} />}
              title="Offline"
              description="Reconnecting…"
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Medium" data-testid="offline-md">
          <GlassCard>
            <OfflineState
              size="md"
              icon={<Icon icon={WifiOff} />}
              title="Offline"
              description="Reconnecting…"
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Large" data-testid="offline-lg">
          <GlassCard>
            <OfflineState
              size="lg"
              icon={<Icon icon={WifiOff} />}
              title="Offline"
              description="Reconnecting…"
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Centered (default)" data-testid="offline-center">
          <GlassPanel>
            <OfflineState
              align="center"
              icon={<Icon icon={Plane} />}
              title="Airplane mode is on"
              description="Turn off airplane mode to reconnect."
              action={<RetryButton />}
            />
          </GlassPanel>
        </Section>

        <Section
          title="Inline (left-aligned)"
          description='align="left" — follows dir automatically via logical start.'
          data-testid="offline-inline"
        >
          <GlassCard>
            <OfflineState
              align="left"
              size="sm"
              icon={<Icon icon={WifiOff} />}
              title="You're offline"
              description="Showing the last synced version."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section
          title="Inside a Drawer (real surface)"
          description="OfflineState fills a real Drawer — no surface of its own."
          data-testid="offline-drawer"
        >
          <Drawer
            title="Sync"
            trigger={<Button variant="secondary">Open drawer</Button>}
          >
            <OfflineState
              icon={<Icon icon={WifiOff} />}
              title="Can't sync while offline"
              description="We'll finish syncing when you reconnect."
              action={<RetryButton />}
            />
          </Drawer>
        </Section>

        <Section
          title="Inside a Dialog (real surface)"
          description="OfflineState fills a real Modal / Dialog surface."
          data-testid="offline-dialog"
        >
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Title className="sr-only">Offline</Modal.Title>
              <OfflineState
                icon={<Icon icon={WifiOff} />}
                title="You're offline"
                description="Reconnect to continue."
                action={<RetryButton />}
              />
            </Modal.Content>
          </Modal>
        </Section>

        <Section
          title="Inside a FullscreenOverlay (real surface)"
          description="OfflineState fills the immersive surface directly."
          data-testid="offline-overlay"
        >
          <FullscreenOverlay
            title="Library"
            trigger={<Button variant="secondary">Open overlay</Button>}
          >
            <div className="flex h-full items-center justify-center">
              <OfflineState
                size="lg"
                icon={<Icon icon={CloudOff} />}
                title="No connection"
                description="Your library will load when you're back online."
                action={<RetryButton />}
              />
            </div>
          </FullscreenOverlay>
        </Section>

        <Section title="Dashboard" data-testid="offline-dashboard">
          <GlassCard>
            <OfflineState
              icon={<Icon icon={WifiOff} />}
              title="Dashboard is offline"
              description="Live metrics will resume once you're reconnected."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Chat disconnected" data-testid="offline-chat">
          <GlassCard>
            <OfflineState
              icon={<Icon icon={WifiOff} />}
              title="Chat disconnected"
              description="Messages will send once your connection is back."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Gallery offline" data-testid="offline-gallery">
          <GlassCard>
            <OfflineState
              icon={<Icon icon={CloudOff} />}
              title="Photos unavailable offline"
              description="Connect to the network to load your gallery."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section title="Files offline" data-testid="offline-files">
          <GlassCard>
            <OfflineState
              icon={<Icon icon={CloudOff} />}
              title="Files are offline"
              description="These files will be available again once you reconnect."
              action={<RetryButton />}
            />
          </GlassCard>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — text follows reading direction naturally.'
          data-testid="offline-rtl"
        >
          <GlassCard>
            <div dir="rtl">
              <OfflineState
                icon={<Icon icon={WifiOff} />}
                title="أنت غير متصل"
                description="تحقّق من اتصالك بالشبكة وحاول مرة أخرى."
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
