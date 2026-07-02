'use client'

import { useEffect, useState } from 'react'

import { DatePicker } from '@/components/ui/date-picker'
import { FileInput } from '@/components/ui/file-input'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Input } from '@/components/ui/input'
import { SearchInput } from '@/components/ui/search-input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const goals = [
  { value: 'loss', label: 'Weight loss' },
  { value: 'gain', label: 'Muscle gain' },
  { value: 'perf', label: 'Performance' },
]

/** Demo files are built in the browser (File is a DOM constructor): a real JPEG
 * fetched from the capture background (image preview), a dummy PDF (icon) and a
 * dummy MP4 (icon fallback — no decodable frame). */
function useDemoFiles() {
  const [image, setImage] = useState<File>()
  const [pdf, setPdf] = useState<File>()
  const [video, setVideo] = useState<File>()

  useEffect(() => {
    let cancelled = false
    setPdf(
      new File([new Uint8Array(48_500)], 'training-plan.pdf', {
        type: 'application/pdf',
      }),
    )
    setVideo(
      new File([new Uint8Array(2_400_000)], 'form-check.mp4', {
        type: 'video/mp4',
      }),
    )
    fetch('/backgrounds/capture-bg.jpg')
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return
        setImage(new File([blob], 'progress-photo.jpg', { type: 'image/jpeg' }))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return { image, pdf, video }
}

function Demo({ dark }: { dark: boolean }) {
  const { image, pdf, video } = useDemoFiles()
  const all = [image, pdf, video].filter((f): f is File => Boolean(f))

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-8">
        <p
          className={
            dark
              ? 'text-body-sm text-white/70'
              : 'text-body-sm text-text-secondary'
          }
        >
          Input → Textarea → SearchInput → Select → DatePicker → FileInput — one
          family, same Control glass. Only the capability changes, never the
          identity. Drag-over reuses the frozen focus expression.
        </p>

        {/* Family — same material, only the geometry/interaction differs. */}
        <div className="flex flex-col gap-4">
          <Input label="Text (Input)" placeholder="Your name" />
          <Textarea label="Multiline (Textarea)" placeholder="A few words…" />
          <SearchInput label="Search (SearchInput)" placeholder="Search…" />
          <Select
            label="Choice (Select)"
            placeholder="Select a goal"
            options={goals}
          />
          <DatePicker label="Date (DatePicker)" placeholder="Select a date" />
          <FileInput
            label="Files (FileInput)"
            accept=".png,.webp,.jpg"
            maxSize={10 * 1024 * 1024}
          />
        </div>

        {/* Single vs multiple + previews (image thumbnail, PDF icon, video). */}
        <div className="grid gap-4 md:grid-cols-2">
          <FileInput
            label="Single file (image preview)"
            files={image ? [image] : []}
          />
          <FileInput
            label="Multiple (image · PDF · video)"
            multiple
            maxFiles={5}
            files={all}
            showFileType
          />
        </div>

        {/* States. */}
        <div className="grid gap-4 md:grid-cols-2">
          <FileInput label="Required" required accept="image/*" />
          <FileInput
            label="Error"
            error="Please attach your training plan."
            accept=".pdf"
          />
          <FileInput
            label="Success"
            success
            helperText="Uploaded."
            files={pdf ? [pdf] : []}
          />
          <FileInput label="Disabled" disabled accept="image/*" />
          <FileInput label="Read only" readOnly files={pdf ? [pdf] : []} />
          <FileInput
            label="Uploading (Progress primitive)"
            showProgress
            progress={45}
            files={image ? [image] : []}
          />
        </div>

        {/* Validation — drop a >1MB or non-PNG file to see live rejection. */}
        <FileInput
          label="Strict validation"
          description="Drop a large or non-PNG file to see it rejected."
          multiple
          accept="image/png"
          maxSize={1024 * 1024}
          maxFiles={2}
        />
      </div>
    </GlassPanel>
  )
}

export function FileInputScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — FileInput (Control
        Surface)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
