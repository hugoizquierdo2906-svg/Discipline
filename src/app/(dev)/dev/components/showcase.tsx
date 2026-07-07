'use client'

import { ArrowRight, Heart, Plus, Search, Settings } from 'lucide-react'
import { useState } from 'react'

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Code,
  DatePicker,
  FileInput,
  Heading,
  Icon,
  IconButton,
  Input,
  Label,
  LinkButton,
  Progress,
  RadioGroup,
  RadioItem,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Text,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'

function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <Heading as="h2" level="h4" className="mb-5">
        {title}
      </Heading>
      <div className="flex flex-wrap items-start gap-4 rounded-lg border border-border bg-surface-raised p-5">
        {children}
      </div>
    </section>
  )
}

export function Showcase() {
  const [date, setDate] = useState<Date | undefined>()
  const [count, setCount] = useState('')

  return (
    <TooltipProvider delayDuration={150}>
      <main className="mx-auto max-w-container px-5 py-10">
        <Heading as="h1" level="h2" className="mb-2">
          DISCIPLINE — Level 1 Components
        </Heading>
        <Text tone="secondary" className="mb-10">
          Every primitive with all of its states. Development surface only.
        </Text>

        <Block title="Button — variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </Block>

        <Block title="Button — sizes, icons, states">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button leadingIcon={<Plus size={18} />}>Leading</Button>
          <Button trailingIcon={<ArrowRight size={18} />}>Trailing</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </Block>

        <Block title="IconButton & LinkButton">
          <TooltipExample />
          <IconButton variant="primary" label="Add" icon={<Plus size={18} />} />
          <IconButton
            variant="outline"
            label="Settings"
            icon={<Settings size={18} />}
          />
          <LinkButton
            href="#"
            variant="secondary"
            trailingIcon={<ArrowRight size={16} />}
          >
            Link button
          </LinkButton>
        </Block>

        <Block title="Inputs">
          <div className="w-64">
            <Input
              label="Email"
              type="email"
              placeholder="you@discipline.app"
              required
            />
          </div>
          <div className="w-64">
            <Input
              label="With counter"
              maxLength={20}
              showCount
              value={count}
              onChange={(e) => setCount(e.target.value)}
              helperText="Max 20 characters"
            />
          </div>
          <div className="w-64">
            <Input
              label="Error"
              defaultValue="bad"
              error="This value is invalid"
            />
          </div>
          <div className="w-64">
            <Input
              label="Search"
              prefix={<Search size={16} />}
              placeholder="Search…"
            />
          </div>
          <div className="w-64">
            <Textarea
              label="Message"
              placeholder="Write something…"
              helperText="Optional"
            />
          </div>
        </Block>

        <Block title="Select">
          <div className="w-64">
            <Select
              aria-label="Goal"
              placeholder="Select a goal"
              options={[
                { value: 'loss', label: 'Weight loss' },
                { value: 'gain', label: 'Muscle gain' },
                { value: 'perf', label: 'Performance' },
              ]}
            />
          </div>
        </Block>

        <Block title="Checkbox, Radio, Switch">
          <div className="flex flex-col gap-3">
            <Checkbox label="Accept terms" defaultChecked />
            <Checkbox label="Indeterminate" checked="indeterminate" />
            <Checkbox label="Disabled" disabled />
          </div>
          <RadioGroup defaultValue="a">
            <RadioItem value="a" label="Option A" />
            <RadioItem value="b" label="Option B" />
            <RadioItem value="c" label="Option C" />
          </RadioGroup>
          <div className="flex flex-col gap-3">
            <Switch label="Notifications" defaultChecked />
            <Switch label="Disabled" disabled />
          </div>
        </Block>

        <Block title="Slider, DatePicker, FileInput">
          <div className="w-64">
            <Label>Volume</Label>
            <div className="mt-3">
              <Slider defaultValue={[40]} max={100} step={1} />
            </div>
          </div>
          <div className="w-64">
            <DatePicker value={date} onChange={setDate} />
          </div>
          <div className="w-72">
            <FileInput
              aria-label="Upload a file"
              accept=".png,.webp"
              maxSize={10 * 1024 * 1024}
            />
          </div>
        </Block>

        <Block title="Badge">
          <Badge>Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </Block>

        <Block title="Avatar">
          <Avatar size="sm" name="Hugo Izquierdo" />
          <Avatar size="md" name="Hugo Izquierdo" />
          <Avatar size="lg" name="Marie Curie" />
          <Avatar size="xl" name="A" />
        </Block>

        <Block title="Icon, Spinner, Skeleton, Separator">
          <Icon icon={Heart} size="sm" />
          <Icon icon={Heart} size="md" className="text-accent" />
          <Icon icon={Heart} size="lg" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <div className="flex w-48 flex-col gap-2">
            <Skeleton shape="text" />
            <Skeleton shape="text" className="w-2/3" />
            <Skeleton shape="rect" className="h-16" />
          </div>
          <Skeleton shape="circle" className="h-12 w-12" />
          <div className="flex h-12 items-center gap-4">
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
          </div>
        </Block>

        <Block title="Typography">
          <div className="flex flex-col gap-2">
            <Heading as="h3" level="h3">
              Heading H3
            </Heading>
            <Text size="body-lg">Body large — intro copy.</Text>
            <Text>Body — reference size.</Text>
            <Text size="body-sm" tone="secondary">
              Body small secondary.
            </Text>
            <Text size="caption" tone="tertiary">
              Caption tertiary.
            </Text>
            <Text>
              Inline <Code>const x = 1</Code> code.
            </Text>
            <Code variant="block">{`function hello() {\n  return 'DISCIPLINE'\n}`}</Code>
          </div>
        </Block>

        <Block title="Progress">
          <div className="w-64">
            <Progress value={64} showLabel />
          </div>
        </Block>

        <Block title="Alert">
          <div className="flex w-full flex-col gap-3">
            <Alert
              variant="info"
              title="Heads up"
              description="This is an informational message."
            />
            <Alert
              variant="success"
              title="Saved"
              description="Your changes were saved."
            />
            <Alert
              variant="warning"
              title="Careful"
              description="Check your input."
            />
            <Alert
              variant="error"
              title="Something went wrong"
              description="Please try again."
              onDismiss={() => {}}
            />
          </div>
        </Block>
      </main>
    </TooltipProvider>
  )
}

function TooltipExample() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton
          variant="ghost"
          label="Favorite"
          icon={<Heart size={18} />}
        />
      </TooltipTrigger>
      <TooltipContent>Add to favorites</TooltipContent>
    </Tooltip>
  )
}
