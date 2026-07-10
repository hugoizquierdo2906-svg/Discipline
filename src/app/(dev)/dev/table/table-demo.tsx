'use client'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Code } from '@/components/ui/code'
import { Heading } from '@/components/ui/heading'
import { Table } from '@/components/ui/table'
import { Text } from '@/components/ui/text'

/**
 * Table is a Data Display primitive: rows × columns for comparing several
 * objects across several properties. It only displays — no sort, filter,
 * edit, selection or virtualization; those belong to a future DataGrid. It
 * composes only the native table elements, Typography and the shared
 * `divider` token. The scene sits on the shared capture wallpaper.
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

const clients = [
  {
    name: 'Léa Martin',
    program: 'Hypertrophy',
    status: 'Active' as const,
    last: "Aujourd'hui",
  },
  {
    name: 'Hugo Izquierdo',
    program: 'Upper / Lower',
    status: 'Draft' as const,
    last: 'Hier',
  },
  {
    name: 'Marc Dubois',
    program: 'Strength',
    status: 'Archived' as const,
    last: '12 juin',
  },
]

const statusVariant = {
  Active: 'success',
  Draft: 'neutral',
  Archived: 'neutral',
} as const

const exercises = [
  { name: 'Bench Press', sets: 4, reps: 8, load: '90 kg' },
  { name: 'Incline DB Press', sets: 3, reps: 10, load: '34 kg' },
  { name: 'Cable Fly', sets: 3, reps: 15, load: '18 kg' },
]

export function TableScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Table
          </Heading>
          <Text className="text-text-secondary">
            A Data Display primitive that answers only &ldquo;how do these
            objects compare across these properties?&rdquo; — never sort,
            filter, edit or select. That belongs to a future DataGrid.
          </Text>
        </div>

        <Section
          title="Clients"
          description="Mixed content — Avatar, Badge and Text composed with zero adaptation."
          data-testid="tb-clients"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Client</Table.Head>
                <Table.Head>Programme</Table.Head>
                <Table.Head>Statut</Table.Head>
                <Table.Head align="end">Dernière séance</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clients.map((c) => (
                <Table.Row key={c.name}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Fallback>{getInitials(c.name)}</Avatar.Fallback>
                      </Avatar>
                      <Text>{c.name}</Text>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{c.program}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                  </Table.Cell>
                  <Table.Cell align="end">{c.last}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Exercises"
          description="Numeric columns aligned to the end — correct in both LTR and RTL."
          data-testid="tb-exercises"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Exercice</Table.Head>
                <Table.Head align="end">Séries</Table.Head>
                <Table.Head align="end">Répétitions</Table.Head>
                <Table.Head align="end">Charge</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exercises.map((e) => (
                <Table.Row key={e.name}>
                  <Table.Cell>{e.name}</Table.Cell>
                  <Table.Cell align="end">{e.sets}</Table.Cell>
                  <Table.Cell align="end">{e.reps}</Table.Cell>
                  <Table.Cell align="end">{e.load}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Basic"
          description="Header + body, nothing else."
          data-testid="tb-basic"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Coach</Table.Head>
                <Table.Head>Speciality</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Sarah Chen</Table.Cell>
                <Table.Cell>Powerlifting</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Tom Reyes</Table.Cell>
                <Table.Cell>Mobility</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Caption"
          description="A native <caption>, discreet, describing the table's content."
          data-testid="tb-caption"
        >
          <Table>
            <Table.Caption>
              Payments processed in the last 7 days.
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>Date</Table.Head>
                <Table.Head align="end">Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>7 Aug 2026</Table.Cell>
                <Table.Cell align="end">
                  <Code>€49.00</Code>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>31 Jul 2026</Table.Cell>
                <Table.Cell align="end">
                  <Code>€49.00</Code>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Footer"
          description="A native <tfoot> — a discreet summary row."
          data-testid="tb-footer"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Session</Table.Head>
                <Table.Head align="end">Volume</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Push day</Table.Cell>
                <Table.Cell align="end">4,200 kg</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Pull day</Table.Cell>
                <Table.Cell align="end">3,850 kg</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell>Total</Table.Cell>
                <Table.Cell align="end">8,050 kg</Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Section>

        <Section
          title="Dense"
          description="Tighter row padding via className — no size prop on Table itself."
          data-testid="tb-dense"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head className="py-1.5">Exercise</Table.Head>
                <Table.Head className="py-1.5" align="end">
                  Load
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="py-1.5">Squat</Table.Cell>
                <Table.Cell className="py-1.5" align="end">
                  100 kg
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="py-1.5">Deadlift</Table.Cell>
                <Table.Cell className="py-1.5" align="end">
                  140 kg
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Comfortable"
          description="Roomier row padding via className."
          data-testid="tb-comfortable"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head className="py-5">Exercise</Table.Head>
                <Table.Head className="py-5" align="end">
                  Load
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="py-5">Squat</Table.Cell>
                <Table.Cell className="py-5" align="end">
                  100 kg
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Sticky header"
          description="stickyHeader — purely visual, no scroll logic of its own."
          data-testid="tb-sticky"
        >
          <div className="h-48 overflow-y-auto rounded-sm border border-divider">
            <Table stickyHeader>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Week</Table.Head>
                  <Table.Head align="end">Volume</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Array.from({ length: 10 }, (_, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>Week {i + 1}</Table.Cell>
                    <Table.Cell align="end">{4000 + i * 120} kg</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Section>

        <Section
          title="Empty cells"
          description="An absent value renders as nothing — never a placeholder graphic."
          data-testid="tb-empty"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Client</Table.Head>
                <Table.Head>Notes</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Léa Martin</Table.Cell>
                <Table.Cell>Prefers morning sessions</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Marc Dubois</Table.Cell>
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Long content"
          description="Text wraps naturally inside its cell — never truncated, never breaking the layout."
          data-testid="tb-long-content"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Client</Table.Head>
                <Table.Head>Notes</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Léa Martin</Table.Cell>
                <Table.Cell>
                  Returning after a long break, rebuilding a consistent training
                  habit around four sessions a week with a deliberate deload
                  every fourth week.
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="Responsive"
          description="A narrow viewport scrolls the table horizontally — columns never break, never become Cards."
          data-testid="tb-responsive"
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Client</Table.Head>
                <Table.Head>Programme</Table.Head>
                <Table.Head>Statut</Table.Head>
                <Table.Head>Coach</Table.Head>
                <Table.Head align="end">Dernière séance</Table.Head>
                <Table.Head align="end">Prochaine séance</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Léa Martin</Table.Cell>
                <Table.Cell>Hypertrophy</Table.Cell>
                <Table.Cell>
                  <Badge variant="success">Active</Badge>
                </Table.Cell>
                <Table.Cell>Sarah Chen</Table.Cell>
                <Table.Cell align="end">Aujourd&apos;hui</Table.Cell>
                <Table.Cell align="end">Lundi</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — column order, alignment and native semantics all mirror correctly.'
          data-testid="tb-rtl"
        >
          <div dir="rtl">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>العميل</Table.Head>
                  <Table.Head align="end">الجلسة الأخيرة</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>ليا مارتن</Table.Cell>
                  <Table.Cell align="end">اليوم</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Section>
      </div>
    </div>
  )
}
