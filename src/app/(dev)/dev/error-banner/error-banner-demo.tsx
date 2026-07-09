'use client'

import {
  Ban,
  CircleAlert,
  CreditCard,
  DownloadCloud,
  RefreshCwOff,
  SaveOff,
  Upload,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ErrorBanner } from '@/components/ui/error-banner'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * ErrorBanner lives IN the page flow and owns its error-tinted surface (built
 * from error tokens) — so, like its frozen banner siblings and unlike the
 * content-only states, it is shown directly in the flow, not inside another
 * surface. The scene sits on the shared capture wallpaper so the banner reads
 * on a realistic screen.
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

export function ErrorBannerScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={3}>
            ErrorBanner
          </Heading>
          <Text tone="secondary">
            A persistent, in-flow, non-modal error — an important failure about
            the current context that doesn&apos;t warrant a modal interruption.
            It lives in the page, pushes content, and stays until the error is
            resolved or the user dismisses it. Not a Toast, not an ErrorState,
            not an AlertDialog. Built only from the design system&apos;s error
            tokens.
          </Text>
        </div>

        <Section title="Basic (title only)" data-testid="eb-basic">
          <ErrorBanner
            icon={<Icon icon={CircleAlert} />}
            title="Couldn't save your changes"
          />
        </Section>

        <Section title="With description" data-testid="eb-description">
          <ErrorBanner
            icon={<Icon icon={CircleAlert} />}
            title="Couldn't save your changes"
            description="A network error interrupted the save. Your edits are still here."
          />
        </Section>

        <Section title="Without description" data-testid="eb-no-description">
          <ErrorBanner icon={<Icon icon={CircleAlert} />} title="Save failed" />
        </Section>

        <Section
          title="Dismissible"
          description="A close button self-hides the banner (and fires onDismiss)."
          data-testid="eb-dismissible"
        >
          <ErrorBanner
            icon={<Icon icon={CircleAlert} />}
            title="Couldn't refresh your data"
            description="We'll keep showing the last version we loaded."
            dismissible
          />
        </Section>

        <Section title="With action" data-testid="eb-action">
          <ErrorBanner
            icon={<Icon icon={SaveOff} />}
            title="Couldn't save your changes"
            description="A network error interrupted the save."
            action={<Button variant="secondary">Retry</Button>}
          />
        </Section>

        <Section title="Without action" data-testid="eb-no-action">
          <ErrorBanner
            icon={<Icon icon={CircleAlert} />}
            title="Some fields couldn't be validated"
            description="Check the highlighted fields and try again."
          />
        </Section>

        <Section title="Dismissible + action" data-testid="eb-action-dismiss">
          <ErrorBanner
            icon={<Icon icon={RefreshCwOff} />}
            title="Sync failed"
            description="Your latest sessions couldn't be uploaded."
            action={<Button variant="secondary">Retry</Button>}
            dismissible
          />
        </Section>

        <Section title="Small" data-testid="eb-sm">
          <ErrorBanner
            size="sm"
            icon={<Icon icon={CircleAlert} />}
            title="Save failed"
            dismissible
          />
        </Section>

        <Section title="Medium" data-testid="eb-md">
          <ErrorBanner
            size="md"
            icon={<Icon icon={CircleAlert} />}
            title="Save failed"
            description="A network error interrupted the save."
            dismissible
          />
        </Section>

        <Section title="Large" data-testid="eb-lg">
          <ErrorBanner
            size="lg"
            icon={<Icon icon={SaveOff} />}
            title="Save failed"
            description="A network error interrupted the save."
            action={<Button variant="secondary">Retry</Button>}
            dismissible
          />
        </Section>

        <Section title="Dashboard" data-testid="eb-dashboard">
          <ErrorBanner
            icon={<Icon icon={CircleAlert} />}
            title="We couldn't load your latest stats"
            description="Everything else is up to date — this widget failed to refresh."
            action={<Button variant="secondary">Retry</Button>}
            dismissible
          />
        </Section>

        <Section title="Payment failed" data-testid="eb-payment">
          <ErrorBanner
            icon={<Icon icon={CreditCard} />}
            title="Your payment was declined"
            description="Update your card to keep your subscription active."
            action={<Button variant="secondary">Update card</Button>}
            dismissible
          />
        </Section>

        <Section title="Import failed" data-testid="eb-import">
          <ErrorBanner
            icon={<Icon icon={DownloadCloud} />}
            title="Import failed"
            description="The file couldn't be read. 0 of 248 exercises were imported."
            action={<Button variant="secondary">Try again</Button>}
            dismissible
          />
        </Section>

        <Section title="Publish failed" data-testid="eb-publish">
          <ErrorBanner
            icon={<Icon icon={Upload} />}
            title="Couldn't publish “Hypertrophy Block 1”"
            description="The server rejected the request. Your draft is safe."
            action={<Button variant="secondary">Retry</Button>}
            dismissible
          />
        </Section>

        <Section title="Sync failed" data-testid="eb-sync">
          <ErrorBanner
            icon={<Icon icon={RefreshCwOff} />}
            title="Sync failed"
            description="3 sessions couldn't be uploaded and stay saved locally."
            action={<Button variant="secondary">Retry</Button>}
            dismissible
          />
        </Section>

        <Section title="Quota exceeded" data-testid="eb-quota">
          <ErrorBanner
            icon={<Icon icon={Ban} />}
            title="Storage quota exceeded"
            description="Your upload was rejected. Free up space or upgrade your plan."
            action={<Button variant="secondary">Manage</Button>}
            dismissible
          />
        </Section>

        <Section
          title="Responsive (follows parent width)"
          description="w-full — the banner tracks its container at any width."
          data-testid="eb-responsive"
        >
          <div className="flex flex-col gap-4">
            <ErrorBanner
              icon={<Icon icon={CircleAlert} />}
              title="Save failed"
              description="Full-width in this column."
              dismissible
            />
            <div className="w-1/2">
              <ErrorBanner
                icon={<Icon icon={CircleAlert} />}
                title="Save failed"
                description="Half-width here."
                dismissible
              />
            </div>
          </div>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — text and the close button flip naturally via flex.'
          data-testid="eb-rtl"
        >
          <div dir="rtl">
            <ErrorBanner
              icon={<Icon icon={CreditCard} />}
              title="تم رفض الدفع"
              description="حدّث بطاقتك للحفاظ على اشتراكك نشطًا."
              action={<Button variant="secondary">تحديث</Button>}
              dismissible
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
