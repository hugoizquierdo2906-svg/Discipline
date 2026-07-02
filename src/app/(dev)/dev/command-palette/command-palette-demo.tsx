'use client'

import {
  BookOpen,
  Calendar,
  CreditCard,
  Dumbbell,
  Home,
  Moon,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CommandPalette,
  type CommandGroup,
} from '@/components/ui/command-palette'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'

const ic = (icon: Parameters<typeof Icon>[0]['icon']) => (
  <Icon icon={icon} size="sm" />
)

const mainGroups: CommandGroup[] = [
  {
    id: 'recent',
    heading: 'Recent',
    items: [
      {
        id: 'r1',
        label: 'Back squat',
        description: 'Exercise · quads, glutes',
        icon: ic(Dumbbell),
        keywords: ['exercise', 'legs'],
      },
      {
        id: 'r2',
        label: 'Hugo Izquierdo',
        description: 'Client · Madrid',
        icon: <Avatar name="Hugo Izquierdo" size="sm" />,
        keywords: ['client', 'coach'],
      },
    ],
  },
  {
    id: 'nav',
    heading: 'Navigation',
    items: [
      {
        id: 'n1',
        label: 'Go to dashboard',
        icon: ic(Home),
        shortcut: '⌘D',
        keywords: ['home'],
      },
      {
        id: 'n2',
        label: 'Go to programs',
        icon: ic(Calendar),
        shortcut: '⌘P',
      },
      {
        id: 'n3',
        label: 'Go to clients',
        icon: ic(Users),
        shortcut: '⌘U',
      },
      {
        id: 'n4',
        label: 'Go to billing',
        icon: ic(CreditCard),
        shortcut: '⌘B',
        disabled: true,
      },
    ],
  },
  {
    id: 'actions',
    heading: 'Actions',
    items: [
      {
        id: 'a1',
        label: 'New workout',
        description: 'Create a session from scratch',
        icon: ic(Plus),
        shortcut: '⌘N',
      },
      {
        id: 'a2',
        label: 'Search library',
        description: 'Exercises, books, templates',
        icon: ic(BookOpen),
      },
      {
        id: 'a3',
        label: 'Syncing sessions…',
        icon: ic(Search),
        loading: true,
      },
    ],
  },
  {
    id: 'settings',
    heading: 'Settings',
    items: [
      {
        id: 's1',
        label: 'Preferences',
        icon: ic(Settings),
        shortcut: '⌘,',
      },
      {
        id: 's2',
        label: 'Toggle dark mode',
        icon: ic(Moon),
        keywords: ['theme'],
      },
      {
        id: 's3',
        label: 'My profile',
        icon: ic(User),
      },
    ],
  },
  {
    id: 'ai',
    heading: 'AI',
    items: [
      {
        id: 'ai1',
        label: 'Ask AI to build a workout',
        description: 'Describe the goal — get a full session',
        icon: ic(Sparkles),
        badge: <Badge>AI</Badge>,
      },
      {
        id: 'ai2',
        label: 'Summarize this week',
        icon: ic(Sparkles),
        badge: <Badge>Soon</Badge>,
        disabled: true,
      },
    ],
  },
]

const longGroups: CommandGroup[] = [
  {
    id: 'long',
    heading: 'Move to week…',
    items: Array.from({ length: 40 }, (_, i) => ({
      id: `w${i + 1}`,
      label: `Week ${String(i + 1).padStart(2, '0')}`,
      icon: ic(Calendar),
    })),
  },
]

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'
  const [mainOpen, setMainOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [longOpen, setLongOpen] = useState(false)

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-8">
        <p className={body}>
          CommandPalette — the system&apos;s single command surface. An
          Immersive Surface that composes the Modal (scrim · focus trap · scroll
          lock · Escape · entrance), the frozen SearchInput and the frozen
          menu-language rows. Open with ⌘K / Ctrl+K or the buttons below.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMainOpen(true)}
            data-open="main"
          >
            Open palette (⌘K)
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLoadingOpen(true)}
            data-open="loading"
          >
            Loading state
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLongOpen(true)}
            data-open="long"
          >
            Long list (scroll)
          </Button>
        </div>

        <CommandPalette
          open={mainOpen}
          onOpenChange={setMainOpen}
          groups={mainGroups}
        />
        <CommandPalette
          open={loadingOpen}
          onOpenChange={setLoadingOpen}
          hotkey={false}
          loading
          groups={mainGroups}
        />
        <CommandPalette
          open={longOpen}
          onOpenChange={setLongOpen}
          hotkey={false}
          groups={longGroups}
        />
      </div>
    </GlassPanel>
  )
}

export function CommandPaletteScene({
  bg,
}: {
  bg: 'proof-canvas' | 'proof-media'
}) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — CommandPalette (Immersive
        ← Modal)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
