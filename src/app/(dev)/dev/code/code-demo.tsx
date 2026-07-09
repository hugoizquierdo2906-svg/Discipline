'use client'

import { Code } from '@/components/ui/code'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

/**
 * Code is a Data Display primitive for a verbatim technical value — a
 * command, a variable, an endpoint, a method, a token, a shortcut. Every
 * section shows it exactly where it lives: inline, next to and inside prose,
 * never on its own dedicated surface. The scene sits on the shared capture
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
        <Heading as="h3" level="h5">
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

export function CodeScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level="h3">
            Code
          </Heading>
          <Text tone="secondary">
            A Data Display primitive for a verbatim technical value. It sets no
            font-size of its own, no colour, no surface beyond a discreet
            neutral background — never a Badge, never a Chip, never interactive.
          </Text>
        </div>

        <Section
          title="Basic"
          description="A single technical value, standing alone."
          data-testid="cd-basic"
        >
          <Code>pnpm build</Code>
        </Section>

        <Section
          title="Command"
          description="A shell command a reader is meant to type or recognise verbatim."
          data-testid="cd-command"
        >
          <Code>pnpm install --frozen-lockfile</Code>
        </Section>

        <Section
          title="Variable"
          description="A property or identifier from real code."
          data-testid="cd-variable"
        >
          <Code>user.email</Code>
        </Section>

        <Section
          title="API endpoint"
          description="A route, shown exactly as it is called."
          data-testid="cd-endpoint"
        >
          <Code>/api/v1/users/:id</Code>
        </Section>

        <Section
          title="HTTP methods"
          description="Several short values, each its own Code — never a single joined string."
          data-testid="cd-http-methods"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Code>GET</Code>
            <Code>POST</Code>
            <Code>PATCH</Code>
            <Code>DELETE</Code>
          </div>
        </Section>

        <Section
          title="CSS token"
          description="A design token name, exactly as declared."
          data-testid="cd-css-token"
        >
          <Code>--ds-color-accent</Code>
        </Section>

        <Section
          title="Keyboard shortcut"
          description={
            'Rendered on a real <kbd> via asChild — user input to type, not a value to read.'
          }
          data-testid="cd-kbd"
        >
          <div className="flex items-center gap-2">
            <Code asChild>
              <kbd>⌘K</kbd>
            </Code>
            <Text size="body-sm" tone="secondary">
              opens the command palette
            </Text>
          </div>
        </Section>

        <Section
          title="Inline sentence"
          description="Embedded in prose, matching the surrounding size exactly."
          data-testid="cd-inline-sentence"
        >
          <Text>
            Run <Code>pnpm build</Code> before every deploy, then confirm{' '}
            <Code>/api/health</Code> returns <Code>200</Code>.
          </Text>
          <Text size="body-lg">
            Set <Code>RPE 8</Code> and stop two reps short of failure.
          </Text>
          <Text size="caption" tone="tertiary">
            Default export: <Code>NODE_ENV=production</Code>
          </Text>
        </Section>

        <Section
          title="Long value"
          description="Wraps cleanly inside a narrow column — never overflows, never truncates."
          data-testid="cd-long-value"
        >
          <div className="max-w-[16rem]">
            <Code>
              a3f9c1e7b2d4860591acbf0e2d7146fa9c8b5e3d1024f6a7b8c9d0e1f2a3b4c5
            </Code>
          </div>
        </Section>

        <Section
          title="Responsive"
          description="The same value, unresized — it inherits its size from context at any width."
          data-testid="cd-responsive"
        >
          <Text size="body-sm">
            Config key: <Code>max_retries</Code>
          </Text>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the value stays left-to-right inside a right-to-left sentence.'
          data-testid="cd-rtl"
        >
          <div dir="rtl">
            <Text>
              نفّذ الأمر <Code>pnpm build</Code> قبل كل نشر.
            </Text>
          </div>
        </Section>
      </div>
    </div>
  )
}
