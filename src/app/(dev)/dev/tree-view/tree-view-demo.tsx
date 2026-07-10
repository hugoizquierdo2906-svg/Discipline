'use client'

import { Dumbbell, File, Folder, Utensils } from 'lucide-react'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { TreeView } from '@/components/ui/tree-view'

/**
 * TreeView is a Data Display primitive: a hierarchy — "what is the
 * structure of these items?" No routing, filesystem, permissions, lazy
 * loading, drag & drop, checkboxes, selection, editing, search or
 * virtualization; those belong to a future File Explorer. Built naturally
 * on the frozen Collapsible — every open/close state machine is
 * Collapsible's own. The scene sits on the shared capture wallpaper.
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

export function TreeViewScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            TreeView
          </Heading>
          <Text className="text-text-secondary">
            A Data Display primitive that answers only &ldquo;what is the
            hierarchical structure of these items?&rdquo; — never routing, never
            a file explorer, never selection. Built naturally on the frozen
            Collapsible.
          </Text>
        </div>

        <Section
          title="Basic"
          description="One branch, one leaf — indentation alone expresses hierarchy."
          data-testid="tv-basic"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Programs</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Icon icon={File} size="sm" />
                    </TreeView.Icon>
                    <TreeView.Label>Upper / Lower</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Nested"
          description="Several levels deep — indentation is the only hierarchy signal, no vertical guide lines."
          data-testid="tv-nested"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Program</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item defaultOpen>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Icon icon={Folder} size="sm" />
                    </TreeView.Icon>
                    <TreeView.Label>Upper / Lower</TreeView.Label>
                  </TreeView.Trigger>
                  <TreeView.Content>
                    <TreeView.Item defaultOpen>
                      <TreeView.Trigger>
                        <TreeView.Icon>
                          <Icon icon={Folder} size="sm" />
                        </TreeView.Icon>
                        <TreeView.Label>Push</TreeView.Label>
                      </TreeView.Trigger>
                      <TreeView.Content>
                        <TreeView.Item>
                          <TreeView.Trigger>
                            <TreeView.Icon>
                              <Icon icon={Dumbbell} size="sm" />
                            </TreeView.Icon>
                            <TreeView.Label>Bench Press — 4 × 8</TreeView.Label>
                          </TreeView.Trigger>
                        </TreeView.Item>
                      </TreeView.Content>
                    </TreeView.Item>
                  </TreeView.Content>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Default open"
          description="defaultOpen starts a branch revealed, uncontrolled."
          data-testid="tv-default-open"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Nutrition</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Calories</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Hydration</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Controlled"
          description="open/onOpenChange drive the branch externally — Collapsible's own contract."
          data-testid="tv-controlled"
        >
          <TreeView>
            <TreeView.Item open>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Sleep</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Last night — 7h 40m</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Uncontrolled"
          description="No open/defaultOpen — starts closed, click to reveal."
          data-testid="tv-uncontrolled"
        >
          <TreeView>
            <TreeView.Item>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Cardio</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Zone 2 — 32 min</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Disabled node"
          description="A disabled branch cannot be expanded — inert, dimmed."
          data-testid="tv-disabled"
        >
          <TreeView>
            <TreeView.Item disabled>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Archived program</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Old Split</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="With Icons"
          description="Folder, file, program, exercise and nutrition icons — composed, never owned by TreeView."
          data-testid="tv-icons"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Library</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Icon icon={Dumbbell} size="sm" />
                    </TreeView.Icon>
                    <TreeView.Label>Training</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Icon icon={Utensils} size="sm" />
                    </TreeView.Icon>
                    <TreeView.Label>Nutrition</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Icon icon={File} size="sm" />
                    </TreeView.Icon>
                    <TreeView.Label>Sleep</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="With Badges"
          description="Status carried by the frozen Badge, unmodified."
          data-testid="tv-badges"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Programs</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Upper / Lower</TreeView.Label>
                    <Badge variant="success">Published</Badge>
                  </TreeView.Trigger>
                </TreeView.Item>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Push Pull Legs</TreeView.Label>
                    <Badge variant="neutral">Draft</Badge>
                  </TreeView.Trigger>
                </TreeView.Item>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Label>Full Body</TreeView.Label>
                    <Badge variant="neutral">Archived</Badge>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="With Avatar"
          description="Coach and client rows — the frozen Avatar, unmodified."
          data-testid="tv-avatar"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Clients</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Avatar size="xs">
                        <Avatar.Fallback>
                          {getInitials('Léa Martin')}
                        </Avatar.Fallback>
                      </Avatar>
                    </TreeView.Icon>
                    <TreeView.Label>Léa Martin</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
                <TreeView.Item>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Avatar size="xs">
                        <Avatar.Fallback>
                          {getInitials('Coach Hugo')}
                        </Avatar.Fallback>
                      </Avatar>
                    </TreeView.Icon>
                    <TreeView.Label>Coach Hugo</TreeView.Label>
                  </TreeView.Trigger>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Long labels"
          description="A long label truncates within its own row — never breaks the hierarchy."
          data-testid="tv-long-label"
        >
          <TreeView>
            <TreeView.Item>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={File} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>
                  Twelve-week hypertrophy block with a deliberate deload every
                  fourth week and a progressive overload scheme
                </TreeView.Label>
              </TreeView.Trigger>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Mixed hierarchy"
          description="A DISCIPLINE example — Program → Split → Session → Exercise."
          data-testid="tv-mixed"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Programme</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item defaultOpen>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Icon icon={Folder} size="sm" />
                    </TreeView.Icon>
                    <TreeView.Label>Upper / Lower</TreeView.Label>
                  </TreeView.Trigger>
                  <TreeView.Content>
                    <TreeView.Item defaultOpen>
                      <TreeView.Trigger>
                        <TreeView.Icon>
                          <Icon icon={Folder} size="sm" />
                        </TreeView.Icon>
                        <TreeView.Label>Push</TreeView.Label>
                      </TreeView.Trigger>
                      <TreeView.Content>
                        <TreeView.Item>
                          <TreeView.Trigger>
                            <TreeView.Icon>
                              <Icon icon={Dumbbell} size="sm" />
                            </TreeView.Icon>
                            <TreeView.Label>Bench Press — 4 × 8</TreeView.Label>
                          </TreeView.Trigger>
                        </TreeView.Item>
                      </TreeView.Content>
                    </TreeView.Item>
                  </TreeView.Content>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Exercises"
          description="A DISCIPLINE example — Push / Pull grouping."
          data-testid="tv-exercises"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Exercices</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item defaultOpen>
                  <TreeView.Trigger>
                    <TreeView.Label>Push</TreeView.Label>
                  </TreeView.Trigger>
                  <TreeView.Content>
                    <TreeView.Item>
                      <TreeView.Trigger>
                        <TreeView.Label>Bench</TreeView.Label>
                      </TreeView.Trigger>
                    </TreeView.Item>
                    <TreeView.Item>
                      <TreeView.Trigger>
                        <TreeView.Label>Fly</TreeView.Label>
                      </TreeView.Trigger>
                    </TreeView.Item>
                  </TreeView.Content>
                </TreeView.Item>
                <TreeView.Item defaultOpen>
                  <TreeView.Trigger>
                    <TreeView.Label>Pull</TreeView.Label>
                  </TreeView.Trigger>
                  <TreeView.Content>
                    <TreeView.Item>
                      <TreeView.Trigger>
                        <TreeView.Label>Rows</TreeView.Label>
                      </TreeView.Trigger>
                    </TreeView.Item>
                    <TreeView.Item>
                      <TreeView.Trigger>
                        <TreeView.Label>Pulldown</TreeView.Label>
                      </TreeView.Trigger>
                    </TreeView.Item>
                  </TreeView.Content>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="Responsive"
          description="Same logic at every width — hierarchy never breaks."
          data-testid="tv-responsive"
        >
          <TreeView>
            <TreeView.Item defaultOpen>
              <TreeView.Trigger>
                <TreeView.Icon>
                  <Icon icon={Folder} size="sm" />
                </TreeView.Icon>
                <TreeView.Label>Clients</TreeView.Label>
              </TreeView.Trigger>
              <TreeView.Content>
                <TreeView.Item defaultOpen>
                  <TreeView.Trigger>
                    <TreeView.Icon>
                      <Avatar size="xs">
                        <Avatar.Fallback>
                          {getInitials('Léa Martin')}
                        </Avatar.Fallback>
                      </Avatar>
                    </TreeView.Icon>
                    <TreeView.Label>Léa Martin</TreeView.Label>
                  </TreeView.Trigger>
                  <TreeView.Content>
                    <TreeView.Item>
                      <TreeView.Trigger>
                        <TreeView.Icon>
                          <Icon icon={Folder} size="sm" />
                        </TreeView.Icon>
                        <TreeView.Label>Programme</TreeView.Label>
                      </TreeView.Trigger>
                    </TreeView.Item>
                    <TreeView.Item>
                      <TreeView.Trigger>
                        <TreeView.Icon>
                          <Icon icon={Folder} size="sm" />
                        </TreeView.Icon>
                        <TreeView.Label>Nutrition</TreeView.Label>
                      </TreeView.Trigger>
                    </TreeView.Item>
                  </TreeView.Content>
                </TreeView.Item>
              </TreeView.Content>
            </TreeView.Item>
          </TreeView>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — indentation, chevron and icons all mirror correctly.'
          data-testid="tv-rtl"
        >
          <div dir="rtl">
            <TreeView>
              <TreeView.Item defaultOpen>
                <TreeView.Trigger>
                  <TreeView.Icon>
                    <Icon icon={Folder} size="sm" />
                  </TreeView.Icon>
                  <TreeView.Label>العملاء</TreeView.Label>
                </TreeView.Trigger>
                <TreeView.Content>
                  <TreeView.Item>
                    <TreeView.Trigger>
                      <TreeView.Icon>
                        <Avatar size="xs">
                          <Avatar.Fallback>
                            {getInitials('ليا مارتن')}
                          </Avatar.Fallback>
                        </Avatar>
                      </TreeView.Icon>
                      <TreeView.Label>ليا مارتن</TreeView.Label>
                    </TreeView.Trigger>
                  </TreeView.Item>
                </TreeView.Content>
              </TreeView.Item>
            </TreeView>
          </div>
        </Section>
      </div>
    </div>
  )
}
