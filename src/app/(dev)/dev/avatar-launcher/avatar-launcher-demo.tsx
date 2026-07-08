'use client'

import { useState } from 'react'

import { AvatarLauncher } from '@/components/avatar/avatar-launcher'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

/**
 * AvatarLauncher is the single, calm entry point to the DISCIPLINE Guide. It is
 * a presence, not an action — so the demos show it on the shared capture
 * wallpaper, including a realistic fixed corner placement, never a decorative
 * card. Sprint 1 is the Launcher only: no Drawer, no conversation, no AI.
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
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </section>
  )
}

export function AvatarLauncherScene() {
  const [opened, setOpened] = useState(0)
  const coach = { name: 'Marie Coach' }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level="h3">
            Avatar Launcher
          </Heading>
          <Text tone="secondary">
            The single, calm door to the DISCIPLINE Guide — a stable presence,
            never a chat bubble, never urgency. Composed only from the frozen
            IconButton, Icon, Spinner, Badge, Avatar and Tooltip.
          </Text>
        </div>

        <Section
          title="Idle (default)"
          description="The calm resting state. Click or press Enter/Space to open."
          data-testid="al-idle"
        >
          <AvatarLauncher
            state="idle"
            onClick={() => setOpened((n) => n + 1)}
          />
          <Text size="body-sm" tone="secondary" data-testid="al-open-count">
            Opened {opened} times
          </Text>
        </Section>

        <Section
          title="Unread (waiting)"
          description="A discreet neutral count — the Guide is waiting for you. Never an alarm colour."
          data-testid="al-unread"
        >
          <AvatarLauncher state="idle" unread={3} />
          <AvatarLauncher state="idle" unread={128} />
        </Section>

        <Section
          title="Conversation active"
          description="A conversation is open — the engaged halo, and aria-expanded."
          data-testid="al-active"
        >
          <AvatarLauncher state="active" />
        </Section>

        <Section
          title="Coach active"
          description="The human coach has joined — their presence marks the corner."
          data-testid="al-coach"
        >
          <AvatarLauncher state="coach" coach={coach} />
        </Section>

        <Section
          title="Loading"
          description="The Guide is preparing — a Spinner, aria-busy, non-interactive."
          data-testid="al-loading"
        >
          <AvatarLauncher state="loading" />
        </Section>

        <Section
          title="Unavailable"
          description="The Guide is down — disabled, with an honest hint. Never alarming."
          data-testid="al-unavailable"
        >
          <AvatarLauncher state="unavailable" />
        </Section>

        <Section
          title="Disabled"
          description="Temporarily non-interactive during a blocking operation."
          data-testid="al-disabled"
        >
          <AvatarLauncher state="idle" disabled />
        </Section>

        <Section
          title="One considered size"
          description="A single entry point keeps one consistent, thumb-friendly target everywhere. Responsiveness is placement, never a smaller target."
          data-testid="al-size"
        >
          <AvatarLauncher state="idle" unread={2} />
        </Section>

        <Section
          title="Placement (fixed corner, safe-area aware)"
          description="A realistic anchor: one consistent peripheral corner, token margins, respecting the device safe area. It never occludes content."
          data-testid="al-placement"
        >
          <div className="relative h-64 w-full overflow-hidden rounded-lg border border-border">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
            />
            <div className="absolute bottom-0 end-0 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pe-[max(1.5rem,env(safe-area-inset-right))]">
              <AvatarLauncher state="idle" unread={1} />
            </div>
          </div>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the corner marker and placement flip naturally via logical properties.'
          data-testid="al-rtl"
        >
          <div dir="rtl" className="flex items-center gap-6">
            <AvatarLauncher state="idle" unread={5} />
            <AvatarLauncher state="coach" coach={coach} />
          </div>
        </Section>
      </div>
    </div>
  )
}
