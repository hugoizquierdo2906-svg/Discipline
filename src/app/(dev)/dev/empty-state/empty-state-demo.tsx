'use client'

import {
  Bell,
  CalendarX,
  Dumbbell,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Inbox,
  Plus,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
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
        <Heading as="h3" level={5}>
          {title}
        </Heading>
        {description && (
          <Text className="text-body-sm text-text-secondary">
            {description}
          </Text>
        )}
      </div>
      <div className="rounded-lg border border-border bg-surface-raised">
        {children}
      </div>
    </section>
  )
}

/** EmptyState proof — every required demo case, on the standard page surface. */
export function EmptyStateScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level={3}>
          EmptyState
        </Heading>
        <Text className="text-text-secondary">
          A meaningful absence of content or result, pointing the user at the
          next action — never a loading state, a blocking error, a notification,
          or progress.
        </Text>
      </div>

      <Section title="Basic" data-testid="empty-basic">
        <EmptyState
          title="Nothing here yet"
          description="When there is content, it will show up in this space."
        />
      </Section>

      <Separator />

      <Section title="Icon" data-testid="empty-icon">
        <EmptyState
          icon={<Icon icon={Inbox} />}
          title="Your inbox is empty"
          description="New messages will appear here as they arrive."
        />
      </Section>

      <Separator />

      <Section
        title="With action"
        description="An icon, a title, a description, and a primary action."
        data-testid="empty-action"
      >
        <EmptyState
          icon={<Icon icon={Users} />}
          title="No clients yet"
          description="Add your first client to start building programs for them."
          action={
            <Button leadingIcon={<Icon icon={Plus} size="sm" />}>
              Add client
            </Button>
          }
        />
      </Section>

      <Separator />

      <Section
        title="Without action"
        description="Purely informative — no next step to offer."
        data-testid="empty-no-action"
      >
        <EmptyState
          icon={<Icon icon={Bell} />}
          title="No notifications"
          description="You're all caught up."
        />
      </Section>

      <Separator />

      <Section title="Small" data-testid="empty-sm">
        <EmptyState
          size="sm"
          icon={<Icon icon={Search} />}
          title="No results"
          description="Try a different search term."
        />
      </Section>

      <Separator />

      <Section title="Medium" data-testid="empty-md">
        <EmptyState
          size="md"
          icon={<Icon icon={Search} />}
          title="No results"
          description="Try a different search term."
        />
      </Section>

      <Separator />

      <Section title="Large" data-testid="empty-lg">
        <EmptyState
          size="lg"
          icon={<Icon icon={Search} />}
          title="No results"
          description="Try a different search term."
        />
      </Section>

      <Separator />

      <Section title="Centered (default)" data-testid="empty-center">
        <EmptyState
          align="center"
          icon={<Icon icon={FolderOpen} />}
          title="No files"
          description="Upload a file to see it listed here."
          action={<Button variant="secondary">Upload</Button>}
        />
      </Section>

      <Separator />

      <Section
        title="Left-aligned"
        description='align="left" — follows dir automatically via logical start.'
        data-testid="empty-left"
      >
        <EmptyState
          align="left"
          icon={<Icon icon={FolderOpen} />}
          title="No files"
          description="Upload a file to see it listed here."
          action={<Button variant="secondary">Upload</Button>}
        />
      </Section>

      <Separator />

      <Section
        title="Inside Table (empty)"
        description="Composed into a table's empty branch."
        data-testid="empty-table"
      >
        <div className="overflow-hidden rounded-md border border-border">
          <div className="flex items-center gap-4 border-b border-border bg-surface px-4 py-2">
            <Text className="text-caption text-text-tertiary w-24">Name</Text>
            <Text className="text-caption text-text-tertiary w-32">Date</Text>
            <Text className="text-caption text-text-tertiary">Status</Text>
          </div>
          <EmptyState
            size="sm"
            icon={<Icon icon={FileText} />}
            title="No records"
            description="Rows will appear here once data is added."
          />
        </div>
      </Section>

      <Separator />

      <Section
        title="Inside List (empty)"
        description="Composed into a list's empty branch."
        data-testid="empty-list"
      >
        <EmptyState
          size="sm"
          icon={<Icon icon={Inbox} />}
          title="Your list is empty"
          description="Items you add will show up here."
          action={<Button size="sm">Add item</Button>}
        />
      </Section>

      <Separator />

      <Section title="No search results" data-testid="empty-search">
        <EmptyState
          icon={<Icon icon={Search} />}
          title="No results for “kettlebell”"
          description="Check the spelling or try a broader term."
          action={<Button variant="secondary">Clear search</Button>}
        />
      </Section>

      <Separator />

      <Section title="No sessions" data-testid="empty-sessions">
        <EmptyState
          icon={<Icon icon={CalendarX} />}
          title="No sessions scheduled"
          description="Book a session and it will appear on your calendar."
          action={
            <Button leadingIcon={<Icon icon={Plus} size="sm" />}>
              Schedule session
            </Button>
          }
        />
      </Section>

      <Separator />

      <Section title="No programs" data-testid="empty-programs">
        <EmptyState
          icon={<Icon icon={Dumbbell} />}
          title="No programs yet"
          description="Build a training program to assign it to your clients."
          action={
            <Button leadingIcon={<Icon icon={Plus} size="sm" />}>
              Create program
            </Button>
          }
        />
      </Section>

      <Separator />

      <Section title="Gallery (empty)" data-testid="empty-gallery">
        <EmptyState
          icon={<Icon icon={ImageIcon} />}
          title="No photos"
          description="Uploaded photos will show up in this gallery."
          action={<Button variant="secondary">Upload photos</Button>}
        />
      </Section>

      <Separator />

      <Section
        title="First use (onboarding)"
        description="A pristine first-run state — welcoming, not an error."
        data-testid="empty-first-use"
      >
        <EmptyState
          size="lg"
          icon={<Icon icon={Sparkles} />}
          title="Welcome to DISCIPLINE"
          description="Create your first program to get started — we'll guide you through it."
          action={<Button size="lg">Get started</Button>}
        />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" — text follows reading direction naturally.'
        data-testid="empty-rtl"
      >
        <div dir="rtl">
          <EmptyState
            icon={<Icon icon={Users} />}
            title="لا يوجد عملاء بعد"
            description="أضف أول عميل لبدء إنشاء البرامج."
            action={<Button>إضافة عميل</Button>}
          />
        </div>
      </Section>
    </div>
  )
}
