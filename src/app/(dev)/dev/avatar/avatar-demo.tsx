'use client'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

/**
 * Avatar is a foundational Data Display primitive — it answers "who is this
 * object?" and nothing else. The demos show it plainly on the shared capture
 * wallpaper. A local image is used as a sample so it loads offline; the broken
 * example points at a missing file to prove the automatic fallback.
 */
const SAMPLE = '/backgrounds/capture-bg.png'

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
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  )
}

const people = [
  'Hugo Izquierdo',
  'Marie Curie',
  'John Doe',
  'Alex Rivera',
  'Sam Lee',
  'Priya Nair',
  'Omar Haddad',
]

function PersonAvatar({ name }: { name: string }) {
  return (
    <Avatar>
      <Avatar.Fallback>{getInitials(name)}</Avatar.Fallback>
    </Avatar>
  )
}

export function AvatarScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url('${SAMPLE}')` }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={3}>
            Avatar
          </Heading>
          <Text className="text-text-secondary">
            A foundational Data Display primitive: it reserves a surface, shows
            an image, and guarantees a fallback (image → initials → a generic
            user icon), so it is never empty. It answers only &ldquo;who is this
            object?&rdquo;.
          </Text>
        </div>

        <Section
          title="Basic (image)"
          description="The image fills the surface, cropped with object-cover, respecting the shape."
          data-testid="av-basic"
        >
          <Avatar size="lg">
            <Avatar.Image src={SAMPLE} alt="Hugo Izquierdo" />
            <Avatar.Fallback>{getInitials('Hugo Izquierdo')}</Avatar.Fallback>
          </Avatar>
        </Section>

        <Section
          title="Initials"
          description="No image — the initials fallback. Never more than two letters."
          data-testid="av-initials"
        >
          <Avatar size="lg">
            <Avatar.Fallback>{getInitials('Hugo Izquierdo')}</Avatar.Fallback>
          </Avatar>
          <Avatar size="lg">
            <Avatar.Fallback>{getInitials('Marie Curie')}</Avatar.Fallback>
          </Avatar>
        </Section>

        <Section
          title="Icon fallback"
          description="Neither image nor name — the last-resort generic user icon."
          data-testid="av-icon"
        >
          <Avatar size="lg">
            <Avatar.Fallback />
          </Avatar>
        </Section>

        <Section
          title="Broken image"
          description="A network error falls back automatically to the initials."
          data-testid="av-broken"
        >
          <Avatar size="lg">
            <Avatar.Image src="/does-not-exist.png" alt="Marie Curie" />
            <Avatar.Fallback>{getInitials('Marie Curie')}</Avatar.Fallback>
          </Avatar>
        </Section>

        <Section
          title="Loading"
          description="While the image loads (or if it is delayed), the fallback holds the surface."
          data-testid="av-loading"
        >
          <Avatar size="lg">
            <Avatar.Image src="/does-not-exist.png" alt="John Doe" />
            <Avatar.Fallback delayMs={600}>
              {getInitials('John Doe')}
            </Avatar.Fallback>
          </Avatar>
        </Section>

        <Section
          title="Sizes"
          description="xs · sm · md · lg · xl — one token scale. Shape never changes; only size."
          data-testid="av-sizes"
        >
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} size={s}>
              <Avatar.Fallback>{getInitials('Hugo Izquierdo')}</Avatar.Fallback>
            </Avatar>
          ))}
        </Section>

        <Section
          title="Shapes"
          description="circle · rounded · square."
          data-testid="av-shapes"
        >
          {(['circle', 'rounded', 'square'] as const).map((sh) => (
            <Avatar key={sh} size="lg" shape={sh}>
              <Avatar.Fallback>{getInitials('Marie Curie')}</Avatar.Fallback>
            </Avatar>
          ))}
        </Section>

        <Section
          title="Group"
          description="Composition only: clean overlap, a token ring, a coherent order."
          data-testid="av-group"
        >
          <Avatar.Group>
            {people.slice(0, 2).map((n) => (
              <PersonAvatar key={n} name={n} />
            ))}
          </Avatar.Group>
          <Avatar.Group>
            {people.slice(0, 3).map((n) => (
              <PersonAvatar key={n} name={n} />
            ))}
          </Avatar.Group>
          <Avatar.Group>
            {people.slice(0, 5).map((n) => (
              <PersonAvatar key={n} name={n} />
            ))}
          </Avatar.Group>
        </Section>

        <Section
          title="Overflow"
          description="Past max, the rest collapse into a calm +N chip."
          data-testid="av-overflow"
        >
          <Avatar.Group max={3}>
            {people.slice(0, 6).map((n) => (
              <PersonAvatar key={n} name={n} />
            ))}
          </Avatar.Group>
          <Avatar.Group max={2}>
            {Array.from({ length: 14 }, (_, i) => (
              <PersonAvatar key={i} name={`User ${i + 1}`} />
            ))}
          </Avatar.Group>
        </Section>

        <Section
          title="Responsive"
          description="The Avatar never changes shape; only its token size varies."
          data-testid="av-responsive"
        >
          <Avatar size="sm">
            <Avatar.Image src={SAMPLE} alt="Hugo Izquierdo" />
            <Avatar.Fallback>{getInitials('Hugo Izquierdo')}</Avatar.Fallback>
          </Avatar>
          <Avatar size="xl">
            <Avatar.Image src={SAMPLE} alt="Hugo Izquierdo" />
            <Avatar.Fallback>{getInitials('Hugo Izquierdo')}</Avatar.Fallback>
          </Avatar>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the group overlap flips naturally via logical margins.'
          data-testid="av-rtl"
        >
          <div dir="rtl">
            <Avatar.Group max={3}>
              {people.slice(0, 6).map((n) => (
                <PersonAvatar key={n} name={n} />
              ))}
            </Avatar.Group>
          </div>
        </Section>
      </div>
    </div>
  )
}
