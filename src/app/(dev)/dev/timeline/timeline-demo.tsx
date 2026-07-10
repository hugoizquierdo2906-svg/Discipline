'use client'

import { Dumbbell, Flame, UserPlus, Utensils } from 'lucide-react'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { Timeline } from '@/components/ui/timeline'

/**
 * Timeline is a Data Display primitive: a read-only chronological record —
 * "in what order did these events happen?" No likes, comments, real-time
 * updates, pagination or filtering; that belongs to a future ActivityFeed.
 * It composes only Typography, the shared `divider`/`border` tokens and
 * whatever content a consumer places in `Timeline.Content` (Avatar, Badge,
 * Icon…) with zero adaptation. The scene sits on the shared capture
 * wallpaper.
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

export function TimelineScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Timeline
          </Heading>
          <Text className="text-text-secondary">
            A Data Display primitive that answers only &ldquo;in what order did
            these events happen?&rdquo; — never a feed, never navigation, never
            a workflow. That belongs to a future ActivityFeed.
          </Text>
        </div>

        <Section
          title="Basic"
          description="Vertical by default — a line, dots, and content in reading order."
          data-testid="tl-basic"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Account created</Timeline.Title>
                <Timeline.Time>08:12</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Program assigned</Timeline.Title>
                <Timeline.Time>09:04</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>First session logged</Timeline.Title>
                <Timeline.Time>18:42</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Horizontal"
          description="The same axis switch, sideways — content still reads in order."
          data-testid="tl-horizontal"
        >
          <Timeline orientation="horizontal">
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Mon</Timeline.Title>
                <Timeline.Description>Push day</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Wed</Timeline.Title>
                <Timeline.Description>Pull day</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Fri</Timeline.Title>
                <Timeline.Description>Legs</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="With Avatar"
          description="Each event carries who performed it — the frozen Avatar, unmodified."
          data-testid="tl-avatar"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot>
                  <Avatar size="xs">
                    <Avatar.Fallback>
                      {getInitials('Léa Martin')}
                    </Avatar.Fallback>
                  </Avatar>
                </Timeline.Dot>
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Check-in received</Timeline.Title>
                <Timeline.Description>Léa Martin</Timeline.Description>
                <Timeline.Time>08:42</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot>
                  <Avatar size="xs">
                    <Avatar.Fallback>
                      {getInitials('Coach Hugo')}
                    </Avatar.Fallback>
                  </Avatar>
                </Timeline.Dot>
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Program updated</Timeline.Title>
                <Timeline.Description>Coach Hugo</Timeline.Description>
                <Timeline.Time>09:31</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="With Badge"
          description="Status carried by the frozen Badge, unmodified."
          data-testid="tl-badge"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Onboarding call</Timeline.Title>
                <Badge variant="success">Completed</Badge>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Payment</Timeline.Title>
                <Badge variant="warning">Pending</Badge>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="With Icons"
          description="Timeline.Dot grows to fit an icon child — zero extra prop."
          data-testid="tl-icons"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot>
                  <Icon icon={UserPlus} size="sm" />
                </Timeline.Dot>
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>New client</Timeline.Title>
                <Timeline.Time>Today</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot>
                  <Icon icon={Dumbbell} size="sm" />
                </Timeline.Dot>
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>New personal record</Timeline.Title>
                <Timeline.Time>Today</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot>
                  <Icon icon={Utensils} size="sm" />
                </Timeline.Dot>
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Nutrition logged</Timeline.Title>
                <Timeline.Time>Yesterday</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Dense"
          description="Tighter rhythm via className — no size prop on Timeline itself."
          data-testid="tl-dense"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content className="pb-2">
                <Timeline.Title>Weigh-in</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content className="pb-2">
                <Timeline.Title>Hydration logged</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content className="pb-2">
                <Timeline.Title>Sleep logged</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Comfortable"
          description="Roomier rhythm via className."
          data-testid="tl-comfortable"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content className="pb-10">
                <Timeline.Title>Assessment</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content className="pb-10">
                <Timeline.Title>Program start</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Long descriptions"
          description="Text wraps naturally across several lines — never truncated."
          data-testid="tl-long-content"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Program note</Timeline.Title>
                <Timeline.Description>
                  Returning after a long break, rebuilding a consistent training
                  habit around four sessions a week with a deliberate deload
                  every fourth week.
                </Timeline.Description>
                <Timeline.Time>Today</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Date groups"
          description="Groups are content the consumer composes — never a Timeline responsibility."
          data-testid="tl-date-groups"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Text className="text-body-sm font-medium text-text-secondary">
                Today
              </Text>
              <Timeline>
                <Timeline.Item>
                  <Timeline.Separator>
                    <Timeline.Dot />
                  </Timeline.Separator>
                  <Timeline.Content>
                    <Timeline.Title>Check-in received</Timeline.Title>
                    <Timeline.Time>08:42</Timeline.Time>
                  </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                  <Timeline.Separator>
                    <Timeline.Dot />
                  </Timeline.Separator>
                  <Timeline.Content>
                    <Timeline.Title>New personal record</Timeline.Title>
                    <Timeline.Time>11:04</Timeline.Time>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col gap-2">
              <Text className="text-body-sm font-medium text-text-secondary">
                Yesterday
              </Text>
              <Timeline>
                <Timeline.Item>
                  <Timeline.Separator>
                    <Timeline.Dot />
                  </Timeline.Separator>
                  <Timeline.Content>
                    <Timeline.Title>Weight logged</Timeline.Title>
                    <Timeline.Time>07:15</Timeline.Time>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        </Section>

        <Section
          title="Exercise history"
          description="A DISCIPLINE example — sets/load composed as plain content."
          data-testid="tl-exercise-history"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot>
                  <Icon icon={Flame} size="sm" />
                </Timeline.Dot>
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Bench Press</Timeline.Title>
                <Timeline.Description>90 kg × 8 reps</Timeline.Description>
                <Timeline.Time>Today 18:42</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Incline DB Press</Timeline.Title>
                <Timeline.Description>34 kg × 10 reps</Timeline.Description>
                <Timeline.Time>Today 18:51</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Client history"
          description="A DISCIPLINE example — account lifecycle events."
          data-testid="tl-client-history"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Client created</Timeline.Title>
                <Timeline.Time>3 Jul</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Program assigned</Timeline.Title>
                <Timeline.Time>4 Jul</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Check-in received</Timeline.Title>
                <Timeline.Time>7 Jul</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Goal updated</Timeline.Title>
                <Timeline.Time>9 Jul</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Nutrition history"
          description="A DISCIPLINE example — daily nutrition log."
          data-testid="tl-nutrition-history"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Calories updated</Timeline.Title>
                <Timeline.Time>07:30</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Weight recorded</Timeline.Title>
                <Timeline.Time>07:32</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Hydration logged</Timeline.Title>
                <Timeline.Time>12:00</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="Empty state"
          description="No events is content, not a Timeline concern — the consumer decides what to render."
          data-testid="tl-empty"
        >
          <Text className="text-body-sm text-text-tertiary">
            No activity yet.
          </Text>
        </Section>

        <Section
          title="Responsive"
          description="Timeline never decides layout for its consumer — DISCIPLINE keeps it vertical on mobile."
          data-testid="tl-responsive"
        >
          <Timeline>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Check-in received</Timeline.Title>
                <Timeline.Description>Léa Martin</Timeline.Description>
                <Timeline.Time>Today 08:42</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>
                <Timeline.Title>Program updated</Timeline.Title>
                <Timeline.Description>Upper / Lower</Timeline.Description>
                <Timeline.Time>Today 09:31</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — axis, alignment and dot placement all mirror correctly.'
          data-testid="tl-rtl"
        >
          <div dir="rtl">
            <Timeline>
              <Timeline.Item>
                <Timeline.Separator>
                  <Timeline.Dot />
                </Timeline.Separator>
                <Timeline.Content>
                  <Timeline.Title>تم استلام تسجيل الوصول</Timeline.Title>
                  <Timeline.Time>08:42</Timeline.Time>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Separator>
                  <Timeline.Dot />
                </Timeline.Separator>
                <Timeline.Content>
                  <Timeline.Title>تم تحديث البرنامج</Timeline.Title>
                  <Timeline.Time>09:31</Timeline.Time>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </div>
        </Section>
      </div>
    </div>
  )
}
