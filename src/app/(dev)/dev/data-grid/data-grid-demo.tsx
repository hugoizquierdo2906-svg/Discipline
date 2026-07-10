'use client'

import { UserX } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Code } from '@/components/ui/code'
import { DataGrid } from '@/components/ui/data-grid'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { SearchInput } from '@/components/ui/search-input'
import { Spinner } from '@/components/ui/spinner'
import { Table } from '@/components/ui/table'
import { Text } from '@/components/ui/text'

/**
 * DataGrid is a Data Display primitive: Table plus the UI affordances a
 * large dataset needs — sortable columns, row selection, pagination, a
 * toolbar. Sort/selection/page state is owned by the CONSUMER (here, the
 * demo's own useState) — DataGrid only renders the affordance and forwards
 * the interaction, exactly like the frozen Table/Pagination/Checkbox
 * already work. The scene sits on the shared capture wallpaper.
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
    coach: 'Sarah Chen',
    program: 'Hypertrophy',
    goal: 'Muscle gain',
    progress: '68%',
    last: 'Today',
    status: 'Active' as const,
  },
  {
    name: 'Hugo Izquierdo',
    coach: 'Tom Reyes',
    program: 'Upper / Lower',
    goal: 'Strength',
    progress: '42%',
    last: 'Yesterday',
    status: 'Draft' as const,
  },
  {
    name: 'Marc Dubois',
    coach: 'Sarah Chen',
    program: 'Full Body',
    goal: 'Fat loss',
    progress: '91%',
    last: '12 Jun',
    status: 'Archived' as const,
  },
  {
    name: 'Nina Rossi',
    coach: 'Tom Reyes',
    program: 'Push Pull Legs',
    goal: 'Muscle gain',
    progress: '15%',
    last: 'Today',
    status: 'Active' as const,
  },
  {
    name: 'Omar Haddad',
    coach: 'Sarah Chen',
    program: 'Hypertrophy',
    goal: 'Strength',
    progress: '77%',
    last: 'Monday',
    status: 'Active' as const,
  },
]

const statusVariant = {
  Active: 'success',
  Draft: 'neutral',
  Archived: 'neutral',
} as const

function SortingDemo() {
  const [sortDirection, setSortDirection] = useState<
    'asc' | 'desc' | undefined
  >(undefined)
  const sorted = useMemo(() => {
    if (!sortDirection) return clients
    const copy = [...clients]
    copy.sort((a, b) =>
      sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    )
    return copy
  }, [sortDirection])

  function toggleSort() {
    setSortDirection((current) =>
      current === undefined ? 'asc' : current === 'asc' ? 'desc' : undefined,
    )
  }

  return (
    <DataGrid>
      <Table role="grid">
        <DataGrid.Header>
          <DataGrid.Row>
            <DataGrid.Column
              sortable
              sortDirection={sortDirection}
              onSort={toggleSort}
            >
              Client
            </DataGrid.Column>
            <DataGrid.Column>Program</DataGrid.Column>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {sorted.map((c) => (
            <DataGrid.Row key={c.name}>
              <DataGrid.Cell>{c.name}</DataGrid.Cell>
              <DataGrid.Cell>{c.program}</DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </Table>
    </DataGrid>
  )
}

function SelectionDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const allSelected = selected.size === clients.length
  const someSelected = selected.size > 0 && !allSelected

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(clients.map((c) => c.name)))
  }
  function toggleOne(name: string) {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <DataGrid>
      <Text className="text-body-sm text-text-secondary">
        {selected.size} of {clients.length} selected
      </Text>
      <Table role="grid">
        <DataGrid.Header>
          <DataGrid.Row>
            <DataGrid.Column className="w-10">
              <Checkbox
                checked={someSelected ? 'indeterminate' : allSelected}
                onCheckedChange={toggleAll}
                aria-label="Select all clients"
              />
            </DataGrid.Column>
            <DataGrid.Column>Client</DataGrid.Column>
            <DataGrid.Column>Program</DataGrid.Column>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {clients.map((c) => (
            <DataGrid.Row key={c.name} aria-selected={selected.has(c.name)}>
              <DataGrid.Cell>
                <Checkbox
                  checked={selected.has(c.name)}
                  onCheckedChange={() => toggleOne(c.name)}
                  aria-label={`Select ${c.name}`}
                />
              </DataGrid.Cell>
              <DataGrid.Cell>{c.name}</DataGrid.Cell>
              <DataGrid.Cell>{c.program}</DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </Table>
    </DataGrid>
  )
}

function PaginationDemo() {
  const pageSize = 2
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(clients.length / pageSize)
  const pageRows = clients.slice((page - 1) * pageSize, page * pageSize)

  return (
    <DataGrid>
      <Table role="grid">
        <DataGrid.Header>
          <DataGrid.Row>
            <DataGrid.Column>Client</DataGrid.Column>
            <DataGrid.Column>Program</DataGrid.Column>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {pageRows.map((c) => (
            <DataGrid.Row key={c.name}>
              <DataGrid.Cell>{c.name}</DataGrid.Cell>
              <DataGrid.Cell>{c.program}</DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </Table>
      <DataGrid.Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </DataGrid>
  )
}

function ToolbarDemo() {
  const [query, setQuery] = useState('')
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <DataGrid>
      <DataGrid.Toolbar>
        <SearchInput
          placeholder="Search clients"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
      </DataGrid.Toolbar>
      <Table role="grid">
        <DataGrid.Header>
          <DataGrid.Row>
            <DataGrid.Column>Client</DataGrid.Column>
            <DataGrid.Column>Program</DataGrid.Column>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {filtered.map((c) => (
            <DataGrid.Row key={c.name}>
              <DataGrid.Cell>{c.name}</DataGrid.Cell>
              <DataGrid.Cell>{c.program}</DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </Table>
    </DataGrid>
  )
}

export function DataGridScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            DataGrid
          </Heading>
          <Text className="text-text-secondary">
            A Data Display primitive that answers only &ldquo;how do I
            manipulate a large set of comparable data?&rdquo; — sorting,
            selection and pagination are UI affordances DataGrid renders; the
            actual state is always owned by the consumer. Built by composing the
            frozen Table directly.
          </Text>
        </div>

        <Section
          title="Basic"
          description="DataGrid.Header/Body/Row/Cell are the exact same Table.Header/Body/Row/Cell."
          data-testid="dg-basic"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                  <DataGrid.Column>Program</DataGrid.Column>
                  <DataGrid.Column>Statut</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                {clients.map((c) => (
                  <DataGrid.Row key={c.name}>
                    <DataGrid.Cell>{c.name}</DataGrid.Cell>
                    <DataGrid.Cell>{c.program}</DataGrid.Cell>
                    <DataGrid.Cell>
                      <Badge variant={statusVariant[c.status]}>
                        {c.status}
                      </Badge>
                    </DataGrid.Cell>
                  </DataGrid.Row>
                ))}
              </DataGrid.Body>
            </Table>
          </DataGrid>
        </Section>

        <Section
          title="Selection"
          description="Row/select-all checkboxes — selection state lives in the consumer, DataGrid only renders the control."
          data-testid="dg-selection"
        >
          <SelectionDemo />
        </Section>

        <Section
          title="Sorting"
          description="DataGrid.Column sortable — the click/aria-sort affordance is DataGrid's; the actual comparator is the consumer's."
          data-testid="dg-sorting"
        >
          <SortingDemo />
        </Section>

        <Section
          title="Pagination"
          description="The real, frozen Pagination composed directly beneath the table."
          data-testid="dg-pagination"
        >
          <PaginationDemo />
        </Section>

        <Section
          title="Toolbar"
          description="A plain flex slot — the consumer composes SearchInput/Button here."
          data-testid="dg-toolbar"
        >
          <ToolbarDemo />
        </Section>

        <Section
          title="Empty"
          description="DataGrid.Empty is a valid tr/td wrapper around the frozen EmptyState."
          data-testid="dg-empty"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                  <DataGrid.Column>Program</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                <DataGrid.Empty colSpan={2}>
                  <EmptyState
                    size="sm"
                    align="center"
                    icon={<Icon icon={UserX} size="lg" />}
                    title="No clients yet"
                    description="Clients you add will appear here."
                  />
                </DataGrid.Empty>
              </DataGrid.Body>
            </Table>
          </DataGrid>
        </Section>

        <Section
          title="Loading"
          description="A full-width row composing the frozen Spinner — no loading state owned by DataGrid."
          data-testid="dg-loading"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                  <DataGrid.Column>Program</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                <DataGrid.Row>
                  <DataGrid.Cell colSpan={2} className="py-10 text-center">
                    <Spinner size="md" label="Loading clients" />
                  </DataGrid.Cell>
                </DataGrid.Row>
              </DataGrid.Body>
            </Table>
          </DataGrid>
        </Section>

        <Section
          title="Mixed content"
          description="Avatar, Badge and Code compose with zero adaptation."
          data-testid="dg-mixed"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                  <DataGrid.Column>Statut</DataGrid.Column>
                  <DataGrid.Column align="end">ID</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                {clients.slice(0, 3).map((c, i) => (
                  <DataGrid.Row key={c.name}>
                    <DataGrid.Cell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <Avatar.Fallback>
                            {getInitials(c.name)}
                          </Avatar.Fallback>
                        </Avatar>
                        <Text>{c.name}</Text>
                      </div>
                    </DataGrid.Cell>
                    <DataGrid.Cell>
                      <Badge variant={statusVariant[c.status]}>
                        {c.status}
                      </Badge>
                    </DataGrid.Cell>
                    <DataGrid.Cell align="end">
                      <Code>{`CL-${1000 + i}`}</Code>
                    </DataGrid.Cell>
                  </DataGrid.Row>
                ))}
              </DataGrid.Body>
            </Table>
          </DataGrid>
        </Section>

        <Section
          title="Long content"
          description="Text wraps naturally inside its cell — never truncated."
          data-testid="dg-long-content"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                  <DataGrid.Column>Notes</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                <DataGrid.Row>
                  <DataGrid.Cell>Léa Martin</DataGrid.Cell>
                  <DataGrid.Cell>
                    Returning after a long break, rebuilding a consistent
                    training habit around four sessions a week with a deliberate
                    deload every fourth week.
                  </DataGrid.Cell>
                </DataGrid.Row>
              </DataGrid.Body>
            </Table>
          </DataGrid>
        </Section>

        <Section
          title="Responsive"
          description="A narrow viewport scrolls horizontally — the frozen Table's own responsive behaviour, inherited unchanged."
          data-testid="dg-responsive"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                  <DataGrid.Column>Coach</DataGrid.Column>
                  <DataGrid.Column>Program</DataGrid.Column>
                  <DataGrid.Column>Goal</DataGrid.Column>
                  <DataGrid.Column>Progress</DataGrid.Column>
                  <DataGrid.Column align="end">Last session</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                {clients.map((c) => (
                  <DataGrid.Row key={c.name}>
                    <DataGrid.Cell>{c.name}</DataGrid.Cell>
                    <DataGrid.Cell>{c.coach}</DataGrid.Cell>
                    <DataGrid.Cell>{c.program}</DataGrid.Cell>
                    <DataGrid.Cell>{c.goal}</DataGrid.Cell>
                    <DataGrid.Cell>{c.progress}</DataGrid.Cell>
                    <DataGrid.Cell align="end">{c.last}</DataGrid.Cell>
                  </DataGrid.Row>
                ))}
              </DataGrid.Body>
            </Table>
          </DataGrid>
        </Section>

        <Section
          title="Disabled"
          description="A disabled sortable column and disabled Pagination — real disabled controls, not a cosmetic dim."
          data-testid="dg-disabled"
        >
          <DataGrid>
            <Table role="grid">
              <DataGrid.Header>
                <DataGrid.Row>
                  <DataGrid.Column>Client</DataGrid.Column>
                </DataGrid.Row>
              </DataGrid.Header>
              <DataGrid.Body>
                {clients.slice(0, 2).map((c) => (
                  <DataGrid.Row key={c.name}>
                    <DataGrid.Cell>{c.name}</DataGrid.Cell>
                  </DataGrid.Row>
                ))}
              </DataGrid.Body>
            </Table>
            <DataGrid.Pagination
              page={1}
              totalPages={3}
              onPageChange={() => {}}
              disabled
            />
          </DataGrid>
        </Section>

        <Section
          title="Sticky header"
          description="stickyHeader is Table's own prop, forwarded straight through."
          data-testid="dg-sticky"
        >
          <DataGrid>
            <div className="h-48 overflow-y-auto rounded-sm border border-divider">
              <Table role="grid" stickyHeader>
                <DataGrid.Header>
                  <DataGrid.Row>
                    <DataGrid.Column>Client</DataGrid.Column>
                    <DataGrid.Column align="end">Progress</DataGrid.Column>
                  </DataGrid.Row>
                </DataGrid.Header>
                <DataGrid.Body>
                  {Array.from({ length: 10 }, (_, i) => (
                    <DataGrid.Row key={i}>
                      <DataGrid.Cell>Client {i + 1}</DataGrid.Cell>
                      <DataGrid.Cell align="end">
                        {(i * 7) % 100}%
                      </DataGrid.Cell>
                    </DataGrid.Row>
                  ))}
                </DataGrid.Body>
              </Table>
            </div>
          </DataGrid>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — columns, sort chevron and pagination all mirror correctly.'
          data-testid="dg-rtl"
        >
          <div dir="rtl">
            <DataGrid>
              <Table role="grid">
                <DataGrid.Header>
                  <DataGrid.Row>
                    <DataGrid.Column>العميل</DataGrid.Column>
                    <DataGrid.Column align="end">التقدم</DataGrid.Column>
                  </DataGrid.Row>
                </DataGrid.Header>
                <DataGrid.Body>
                  <DataGrid.Row>
                    <DataGrid.Cell>ليا مارتن</DataGrid.Cell>
                    <DataGrid.Cell align="end">68%</DataGrid.Cell>
                  </DataGrid.Row>
                </DataGrid.Body>
              </Table>
              <DataGrid.Pagination
                page={1}
                totalPages={3}
                onPageChange={() => {}}
              />
            </DataGrid>
          </div>
        </Section>
      </div>
    </div>
  )
}
