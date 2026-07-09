'use client'

import {
  AlertTriangle,
  CalendarClock,
  FileWarning,
  HardDrive,
  MailWarning,
  RefreshCwOff,
  UserRoundPen,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { WarningBanner } from '@/components/ui/warning-banner'

/**
 * WarningBanner lives IN the page flow and owns its warning-tinted surface
 * (built from warning tokens) — so, like the frozen SuccessBanner and unlike
 * the content-only states, it is shown directly in the flow, not inside
 * another surface. The scene sits on the shared capture wallpaper so the
 * banner reads on a realistic screen.
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
          <Text className="text-body-sm text-text-secondary">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}

export function WarningBannerScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={3}>
            WarningBanner
          </Heading>
          <Text className="text-text-secondary">
            A persistent, in-flow warning — a situation that needs the
            user&apos;s attention without blocking their work. It lives in the
            page, pushes content, and stays until the risk is resolved or the
            user dismisses it. Not a Toast, not an Alert, not an ErrorState.
            Built only from the design system&apos;s warning tokens.
          </Text>
        </div>

        <Section title="Basic (title only)" data-testid="wb-basic">
          <WarningBanner
            icon={<Icon icon={AlertTriangle} />}
            title="Your profile is incomplete"
          />
        </Section>

        <Section title="With description" data-testid="wb-description">
          <WarningBanner
            icon={<Icon icon={AlertTriangle} />}
            title="Your profile is incomplete"
            description="Add a photo and your specialties so clients can find you."
          />
        </Section>

        <Section title="Without description" data-testid="wb-no-description">
          <WarningBanner
            icon={<Icon icon={AlertTriangle} />}
            title="Action needed"
          />
        </Section>

        <Section
          title="Dismissible"
          description="A close button self-hides the banner (and fires onDismiss)."
          data-testid="wb-dismissible"
        >
          <WarningBanner
            icon={<Icon icon={CalendarClock} />}
            title="Your subscription renews soon"
            description="You'll be charged on 7 Aug 2026 unless you cancel."
            dismissible
          />
        </Section>

        <Section title="With action" data-testid="wb-action">
          <WarningBanner
            icon={<Icon icon={UserRoundPen} />}
            title="Finish setting up your account"
            description="A complete profile gets 3× more client requests."
            action={<Button variant="secondary">Complete</Button>}
          />
        </Section>

        <Section title="Without action" data-testid="wb-no-action">
          <WarningBanner
            icon={<Icon icon={AlertTriangle} />}
            title="Some changes aren't published yet"
            description="Clients still see the previous version."
          />
        </Section>

        <Section title="Dismissible + action" data-testid="wb-action-dismiss">
          <WarningBanner
            icon={<Icon icon={MailWarning} />}
            title="Verify your email address"
            description="We sent a link to confirm hugo@example.com."
            action={<Button variant="secondary">Resend</Button>}
            dismissible
          />
        </Section>

        <Section title="Small" data-testid="wb-sm">
          <WarningBanner
            size="sm"
            icon={<Icon icon={AlertTriangle} />}
            title="Storage almost full"
            dismissible
          />
        </Section>

        <Section title="Medium" data-testid="wb-md">
          <WarningBanner
            size="md"
            icon={<Icon icon={AlertTriangle} />}
            title="Storage almost full"
            description="You've used 92% of your plan."
            dismissible
          />
        </Section>

        <Section title="Large" data-testid="wb-lg">
          <WarningBanner
            size="lg"
            icon={<Icon icon={HardDrive} />}
            title="Storage almost full"
            description="You've used 92% of your plan."
            action={<Button variant="secondary">Upgrade</Button>}
            dismissible
          />
        </Section>

        <Section title="Dashboard" data-testid="wb-dashboard">
          <WarningBanner
            icon={<Icon icon={UserRoundPen} />}
            title="Complete your profile to start taking clients"
            description="You're missing a photo, a bio and your rates."
            action={<Button variant="secondary">Finish setup</Button>}
            dismissible
          />
        </Section>

        <Section title="Subscription expiring" data-testid="wb-subscription">
          <WarningBanner
            icon={<Icon icon={CalendarClock} />}
            title="Your subscription expires in 3 days"
            description="Renew now to keep access to your programs and clients."
            action={<Button variant="secondary">Renew</Button>}
            dismissible
          />
        </Section>

        <Section title="Storage almost full" data-testid="wb-storage">
          <WarningBanner
            icon={<Icon icon={HardDrive} />}
            title="Storage almost full"
            description="92% used — new uploads may fail until you free up space."
            action={<Button variant="secondary">Manage</Button>}
            dismissible
          />
        </Section>

        <Section title="Profile incomplete" data-testid="wb-profile">
          <WarningBanner
            icon={<Icon icon={UserRoundPen} />}
            title="Your profile is incomplete"
            description="Add your specialties and a photo to appear in search."
            action={<Button variant="secondary">Complete</Button>}
            dismissible
          />
        </Section>

        <Section title="Program unpublished" data-testid="wb-unpublished">
          <WarningBanner
            icon={<Icon icon={FileWarning} />}
            title="“Hypertrophy Block 1” isn't published"
            description="Your clients can't see it until you publish."
            action={<Button variant="secondary">Publish</Button>}
            dismissible
          />
        </Section>

        <Section title="Partial sync" data-testid="wb-sync">
          <WarningBanner
            icon={<Icon icon={RefreshCwOff} />}
            title="Some data hasn't finished syncing"
            description="3 sessions are saved locally and will upload when possible."
            action={<Button variant="secondary">Retry</Button>}
            dismissible
          />
        </Section>

        <Section
          title="Responsive (follows parent width)"
          description="w-full — the banner tracks its container at any width."
          data-testid="wb-responsive"
        >
          <div className="flex flex-col gap-4">
            <WarningBanner
              icon={<Icon icon={AlertTriangle} />}
              title="Storage almost full"
              description="Full-width in this column."
              dismissible
            />
            <div className="w-1/2">
              <WarningBanner
                icon={<Icon icon={AlertTriangle} />}
                title="Storage almost full"
                description="Half-width here."
                dismissible
              />
            </div>
          </div>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — text and the close button flip naturally via flex.'
          data-testid="wb-rtl"
        >
          <div dir="rtl">
            <WarningBanner
              icon={<Icon icon={CalendarClock} />}
              title="ينتهي اشتراكك قريبًا"
              description="جدّد الآن للحفاظ على الوصول إلى برامجك وعملائك."
              action={<Button variant="secondary">تجديد</Button>}
              dismissible
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
