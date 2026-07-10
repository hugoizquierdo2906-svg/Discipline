'use client'

import { CreditCard, Dumbbell, Utensils } from 'lucide-react'

import { ActivityFeed } from '@/components/ui/activity-feed'
import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code } from '@/components/ui/code'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * ActivityFeed is a Data Display primitive: a list of recent activities —
 * "what happened recently?" No likes, comments, reactions, notifications,
 * real-time updates or pagination; those belong to the consuming screen.
 * It composes only Typography, the shared `divider` token, the frozen
 * Separator between rows, and whatever content a consumer places in its
 * slots (Avatar, Icon, Badge, Button…) with zero adaptation. The scene sits
 * on the shared capture wallpaper.
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

export function ActivityFeedScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            ActivityFeed
          </Heading>
          <Text className="text-text-secondary">
            A Data Display primitive that answers only &ldquo;what happened
            recently?&rdquo; — never a chronological axis (Timeline), never a
            social feed. No likes, comments, reactions or notifications.
          </Text>
        </div>

        <Section
          title="Basic"
          description="Avatar/Icon slot, Title, Meta — separated by the frozen Separator, faded."
          data-testid="af-basic"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>
                  Léa Martin completed today&apos;s check-in
                </ActivityFeed.Title>
                <ActivityFeed.Meta>Today · 08:42</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Bench Press updated</ActivityFeed.Title>
                <ActivityFeed.Description>100 kg × 5</ActivityFeed.Description>
                <ActivityFeed.Meta>Yesterday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Compact"
          description="Tighter row padding via the compact prop — same rhythm, denser."
          data-testid="af-compact"
        >
          <ActivityFeed compact>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Calories updated</ActivityFeed.Title>
                <ActivityFeed.Meta>07:30</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Water added</ActivityFeed.Title>
                <ActivityFeed.Meta>09:15</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Meal logged</ActivityFeed.Title>
                <ActivityFeed.Meta>12:00</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Comfortable"
          description="Default rhythm — roomier than Compact."
          data-testid="af-comfortable"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Assessment completed</ActivityFeed.Title>
                <ActivityFeed.Meta>Monday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Program started</ActivityFeed.Title>
                <ActivityFeed.Meta>Monday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="With Avatar"
          description="Each activity carries who performed it — the frozen Avatar, unmodified."
          data-testid="af-avatar"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>
                  Coach Hugo updated the program
                </ActivityFeed.Title>
                <ActivityFeed.Meta>Today · 09:31</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="With Icon"
          description="Icon slot shares the exact same footprint as Avatar — rows stay aligned."
          data-testid="af-icon"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={CreditCard} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Payment received</ActivityFeed.Title>
                <ActivityFeed.Meta>Today</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="With Badge"
          description="Status carried by the frozen Badge, unmodified."
          data-testid="af-badge"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Program updated</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Upper / Lower Split
                </ActivityFeed.Description>
                <Badge variant="success">Published</Badge>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Multiple lines"
          description="A long description wraps naturally — never truncated."
          data-testid="af-long-content"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Program note added</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Returning after a long break, rebuilding a consistent training
                  habit around four sessions a week with a deliberate deload
                  every fourth week.
                </ActivityFeed.Description>
                <ActivityFeed.Meta>Today</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Metadata"
          description="Plain display strings — Today, Yesterday, 2 min ago — never relative-time logic."
          data-testid="af-metadata"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Session logged</ActivityFeed.Title>
                <ActivityFeed.Meta>2 min ago</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Session logged</ActivityFeed.Title>
                <ActivityFeed.Meta>3 hours ago</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Session logged</ActivityFeed.Title>
                <ActivityFeed.Meta>Monday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="With Action"
          description="A real, frozen Button composed inside Actions — never a Timeline/Feed feature."
          data-testid="af-actions"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>
                    {getInitials('Marc Dubois')}
                  </Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Payment received</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Invoice <Code>#4821</Code>
                </ActivityFeed.Description>
                <ActivityFeed.Actions>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </ActivityFeed.Actions>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Exercise feed"
          description="A DISCIPLINE example."
          data-testid="af-exercise-feed"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Bench Press updated</ActivityFeed.Title>
                <ActivityFeed.Description>100 kg</ActivityFeed.Description>
                <ActivityFeed.Meta>Today</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Nutrition feed"
          description="A DISCIPLINE example."
          data-testid="af-nutrition-feed"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Calories updated</ActivityFeed.Title>
                <ActivityFeed.Meta>07:30</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Water added</ActivityFeed.Title>
                <ActivityFeed.Meta>12:00</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Meal logged</ActivityFeed.Title>
                <ActivityFeed.Meta>19:20</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Coach feed"
          description="A DISCIPLINE example."
          data-testid="af-coach-feed"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Coach assigned</ActivityFeed.Title>
                <ActivityFeed.Meta>Monday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Review completed</ActivityFeed.Title>
                <ActivityFeed.Meta>Tuesday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Program updated</ActivityFeed.Title>
                <ActivityFeed.Meta>Today</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Client feed"
          description="A DISCIPLINE example."
          data-testid="af-client-feed"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Client created</ActivityFeed.Title>
                <ActivityFeed.Meta>3 Jul</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Check-in received</ActivityFeed.Title>
                <ActivityFeed.Meta>7 Jul</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Progress reviewed</ActivityFeed.Title>
                <ActivityFeed.Meta>9 Jul</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Mixed feed"
          description="Avatar, Badge, Button, Code, Text all compose with zero adaptation."
          data-testid="af-mixed"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>
                  Completed today&apos;s check-in
                </ActivityFeed.Title>
                <ActivityFeed.Meta>Today · 08:42</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Dumbbell} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Bench Press updated</ActivityFeed.Title>
                <ActivityFeed.Description>100 kg × 5</ActivityFeed.Description>
                <ActivityFeed.Meta>Yesterday</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Icon>
                <Icon icon={Utensils} size="sm" />
              </ActivityFeed.Icon>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Nutrition updated</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Calories: 2150
                </ActivityFeed.Description>
                <ActivityFeed.Meta>Today</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Program updated</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Upper / Lower Split
                </ActivityFeed.Description>
                <Badge variant="success">Published</Badge>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>
                    {getInitials('Marc Dubois')}
                  </Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Payment received</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Invoice <Code>#4821</Code>
                </ActivityFeed.Description>
                <ActivityFeed.Actions>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </ActivityFeed.Actions>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="Empty state"
          description="No activity is content, not an ActivityFeed concern — the consumer decides what to render."
          data-testid="af-empty"
        >
          <Text className="text-body-sm text-text-tertiary">
            No activity yet.
          </Text>
        </Section>

        <Section
          title="Responsive"
          description="ActivityFeed stays vertical at every width — it has no horizontal mode."
          data-testid="af-responsive"
        >
          <ActivityFeed>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Léa Martin')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Check-in received</ActivityFeed.Title>
                <ActivityFeed.Description>Léa Martin</ActivityFeed.Description>
                <ActivityFeed.Meta>Today · 08:42</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
            <ActivityFeed.Item>
              <ActivityFeed.Avatar>
                <Avatar size="sm">
                  <Avatar.Fallback>{getInitials('Coach Hugo')}</Avatar.Fallback>
                </Avatar>
              </ActivityFeed.Avatar>
              <ActivityFeed.Content>
                <ActivityFeed.Title>Program updated</ActivityFeed.Title>
                <ActivityFeed.Description>
                  Upper / Lower
                </ActivityFeed.Description>
                <ActivityFeed.Meta>Today · 09:31</ActivityFeed.Meta>
              </ActivityFeed.Content>
            </ActivityFeed.Item>
          </ActivityFeed>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — avatar/icon slot, alignment and text all mirror correctly.'
          data-testid="af-rtl"
        >
          <div dir="rtl">
            <ActivityFeed>
              <ActivityFeed.Item>
                <ActivityFeed.Avatar>
                  <Avatar size="sm">
                    <Avatar.Fallback>
                      {getInitials('ليا مارتن')}
                    </Avatar.Fallback>
                  </Avatar>
                </ActivityFeed.Avatar>
                <ActivityFeed.Content>
                  <ActivityFeed.Title>
                    تم استلام تسجيل الوصول
                  </ActivityFeed.Title>
                  <ActivityFeed.Meta>اليوم · 08:42</ActivityFeed.Meta>
                </ActivityFeed.Content>
              </ActivityFeed.Item>
              <ActivityFeed.Item>
                <ActivityFeed.Icon>
                  <Icon icon={Dumbbell} size="sm" />
                </ActivityFeed.Icon>
                <ActivityFeed.Content>
                  <ActivityFeed.Title>تم تحديث البرنامج</ActivityFeed.Title>
                  <ActivityFeed.Meta>أمس</ActivityFeed.Meta>
                </ActivityFeed.Content>
              </ActivityFeed.Item>
            </ActivityFeed>
          </div>
        </Section>
      </div>
    </div>
  )
}
