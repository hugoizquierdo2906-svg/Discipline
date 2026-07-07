'use client'

import {
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  DownloadCloud,
  Rocket,
  Settings2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { SuccessBanner } from '@/components/ui/success-banner'
import { Text } from '@/components/ui/text'

/**
 * SuccessBanner lives IN the page flow and owns its success-tinted surface
 * (built from success tokens) — so, unlike the content-only states, it is
 * shown directly in the flow, not inside another surface. The scene sits on
 * the shared capture wallpaper so the banner reads on a realistic screen.
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

export function SuccessBannerScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level="h3">
            SuccessBanner
          </Heading>
          <Text tone="secondary">
            A persistent, in-flow confirmation that an operation succeeded — it
            lives in the page, pushes content, and stays until dismissed or the
            state changes. Not a Toast, not an Alert, not a Dialog. Built only
            from the design system&apos;s success tokens.
          </Text>
        </div>

        <Section title="Basic (title only)" data-testid="sb-basic">
          <SuccessBanner
            icon={<Icon icon={CheckCircle2} />}
            title="Changes saved"
          />
        </Section>

        <Section title="With description" data-testid="sb-description">
          <SuccessBanner
            icon={<Icon icon={CheckCircle2} />}
            title="Changes saved"
            description="Your latest edits are now live for everyone on your team."
          />
        </Section>

        <Section title="Without description" data-testid="sb-no-description">
          <SuccessBanner icon={<Icon icon={CheckCircle2} />} title="All set" />
        </Section>

        <Section
          title="Dismissible"
          description="A close button self-hides the banner (and fires onDismiss)."
          data-testid="sb-dismissible"
        >
          <SuccessBanner
            icon={<Icon icon={CheckCircle2} />}
            title="Profile updated"
            description="Your profile changes have been saved."
            dismissible
          />
        </Section>

        <Section title="With action" data-testid="sb-action">
          <SuccessBanner
            icon={<Icon icon={Rocket} />}
            title="Program published"
            description="Your program is now visible to your clients."
            action={<Button variant="secondary">View</Button>}
          />
        </Section>

        <Section title="Without action" data-testid="sb-no-action">
          <SuccessBanner
            icon={<Icon icon={BadgeCheck} />}
            title="Verified"
            description="Your account is verified."
          />
        </Section>

        <Section title="Dismissible + action" data-testid="sb-action-dismiss">
          <SuccessBanner
            icon={<Icon icon={CheckCircle2} />}
            title="Session recorded"
            description="The session was added to the client's calendar."
            action={<Button variant="secondary">Open</Button>}
            dismissible
          />
        </Section>

        <Section title="Small" data-testid="sb-sm">
          <SuccessBanner
            size="sm"
            icon={<Icon icon={CheckCircle2} />}
            title="Saved"
            dismissible
          />
        </Section>

        <Section title="Medium" data-testid="sb-md">
          <SuccessBanner
            size="md"
            icon={<Icon icon={CheckCircle2} />}
            title="Saved"
            description="Your changes are saved."
            dismissible
          />
        </Section>

        <Section title="Large" data-testid="sb-lg">
          <SuccessBanner
            size="lg"
            icon={<Icon icon={CheckCircle2} />}
            title="Saved"
            description="Your changes are saved."
            action={<Button variant="secondary">Undo</Button>}
            dismissible
          />
        </Section>

        <Section title="Program published" data-testid="sb-program">
          <SuccessBanner
            icon={<Icon icon={Rocket} />}
            title="Program published"
            description="“Hypertrophy Block 1” is live for 12 clients."
            action={<Button variant="secondary">Share</Button>}
            dismissible
          />
        </Section>

        <Section title="Payment confirmed" data-testid="sb-payment">
          <SuccessBanner
            icon={<Icon icon={CreditCard} />}
            title="Payment confirmed"
            description="Your subscription is active until 7 Aug 2026."
            dismissible
          />
        </Section>

        <Section title="Import completed" data-testid="sb-import">
          <SuccessBanner
            icon={<Icon icon={DownloadCloud} />}
            title="Import completed"
            description="248 exercises were imported into your library."
            action={<Button variant="secondary">Review</Button>}
            dismissible
          />
        </Section>

        <Section title="Settings saved" data-testid="sb-settings">
          <SuccessBanner
            icon={<Icon icon={Settings2} />}
            title="Settings saved"
            dismissible
          />
        </Section>

        <Section
          title="Responsive (follows parent width)"
          description="w-full — the banner tracks its container at any width."
          data-testid="sb-responsive"
        >
          <div className="flex flex-col gap-4">
            <SuccessBanner
              icon={<Icon icon={CheckCircle2} />}
              title="Saved"
              description="Full-width in this column."
              dismissible
            />
            <div className="w-1/2">
              <SuccessBanner
                icon={<Icon icon={CheckCircle2} />}
                title="Saved"
                description="Half-width here."
                dismissible
              />
            </div>
          </div>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — text and the close button flip naturally via flex.'
          data-testid="sb-rtl"
        >
          <div dir="rtl">
            <SuccessBanner
              icon={<Icon icon={CheckCircle2} />}
              title="تم الحفظ"
              description="تم حفظ تغييراتك بنجاح."
              action={<Button variant="secondary">عرض</Button>}
              dismissible
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
