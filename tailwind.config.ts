import type { Config } from 'tailwindcss'

/**
 * DISCIPLINE — Tailwind configuration
 * ---------------------------------------------------------------------------
 * SOURCE OF TRUTH: docs/DISCIPLINE_CANONICAL_TOKENS.md (v1.1.0), via the CSS
 * custom properties declared in src/styles/tokens.css. Every utility below
 * maps to a `--ds-*` token — no literal design value is introduced here except
 * the breakpoint widths (§10), which CSS media queries require as literals.
 * ---------------------------------------------------------------------------
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
  ],
  // The /dev/tokens preview composes utility names dynamically; safelist the
  // enumerated token utilities so the JIT emits them. Dev-surface only.
  safelist: [
    {
      pattern:
        /^bg-(bg|surface|surface-raised|accent|accent-accessible|accent-subtle|success|warning|error|info)$/,
    },
    {
      pattern:
        /^text-(display-1|display-2|display-3|h1|h2|h3|h4|h5|body-lg|body|body-sm|caption)$/,
    },
    { pattern: /^rounded-(xs|sm|md|lg|xl|pill)$/ },
    { pattern: /^shadow-(1|2|3|4|contact|ambient|accent-glow)$/ },
    { pattern: /^w-(1|2|3|4|5|6|7|8|9|10|11|12)$/ },
  ],
  theme: {
    // Breakpoints (§10) — literal widths required by media-query generation.
    screens: {
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    extend: {
      colors: {
        bg: 'var(--ds-color-bg)',
        surface: 'var(--ds-color-surface)',
        'surface-raised': 'var(--ds-color-surface-raised)',
        text: {
          DEFAULT: 'var(--ds-color-text)',
          secondary: 'var(--ds-color-text-secondary)',
          tertiary: 'var(--ds-color-text-tertiary)',
          disabled: 'var(--ds-color-text-disabled)',
          'on-accent': 'var(--ds-color-text-on-accent)',
        },
        accent: {
          DEFAULT: 'var(--ds-color-accent)',
          accessible: 'var(--ds-color-accent-accessible)',
          subtle: 'var(--ds-color-accent-subtle)',
          contrast: 'var(--ds-color-accent-contrast)',
        },
        success: 'var(--ds-color-success)',
        warning: 'var(--ds-color-warning)',
        error: 'var(--ds-color-error)',
        info: 'var(--ds-color-info)',
        border: {
          DEFAULT: 'var(--ds-color-border)',
          strong: 'var(--ds-color-border-strong)',
        },
        divider: 'var(--ds-color-divider)',
        'neutral-light': 'var(--ds-color-neutral-light)',
        glass: {
          thin: 'var(--ds-glass-thin)',
          regular: 'var(--ds-glass-regular)',
          thick: 'var(--ds-glass-thick)',
          border: 'var(--ds-glass-border)',
          highlight: 'var(--ds-glass-highlight)',
        },
      },
      fontFamily: {
        sans: 'var(--ds-font-sans)',
        mono: 'var(--ds-font-mono)',
      },
      fontWeight: {
        regular: 'var(--ds-font-weight-regular)',
        medium: 'var(--ds-font-weight-medium)',
        semibold: 'var(--ds-font-weight-semibold)',
      },
      fontSize: {
        'display-1': [
          'var(--ds-text-display-1)',
          {
            lineHeight: 'var(--ds-leading-display-1)',
            letterSpacing: 'var(--ds-tracking-display-1)',
          },
        ],
        'display-2': [
          'var(--ds-text-display-2)',
          {
            lineHeight: 'var(--ds-leading-display-2)',
            letterSpacing: 'var(--ds-tracking-display-2)',
          },
        ],
        'display-3': [
          'var(--ds-text-display-3)',
          {
            lineHeight: 'var(--ds-leading-display-3)',
            letterSpacing: 'var(--ds-tracking-display-3)',
          },
        ],
        h1: [
          'var(--ds-text-h1)',
          {
            lineHeight: 'var(--ds-leading-h1)',
            letterSpacing: 'var(--ds-tracking-h1)',
          },
        ],
        h2: [
          'var(--ds-text-h2)',
          {
            lineHeight: 'var(--ds-leading-h2)',
            letterSpacing: 'var(--ds-tracking-h2)',
          },
        ],
        h3: [
          'var(--ds-text-h3)',
          {
            lineHeight: 'var(--ds-leading-h3)',
            letterSpacing: 'var(--ds-tracking-h3)',
          },
        ],
        h4: [
          'var(--ds-text-h4)',
          {
            lineHeight: 'var(--ds-leading-h4)',
            letterSpacing: 'var(--ds-tracking-h4)',
          },
        ],
        h5: [
          'var(--ds-text-h5)',
          {
            lineHeight: 'var(--ds-leading-h5)',
            letterSpacing: 'var(--ds-tracking-h5)',
          },
        ],
        'body-lg': [
          'var(--ds-text-body-lg)',
          { lineHeight: 'var(--ds-leading-body-lg)' },
        ],
        body: ['var(--ds-text-body)', { lineHeight: 'var(--ds-leading-body)' }],
        'body-sm': [
          'var(--ds-text-body-sm)',
          { lineHeight: 'var(--ds-leading-body-sm)' },
        ],
        caption: [
          'var(--ds-text-caption)',
          {
            lineHeight: 'var(--ds-leading-caption)',
            letterSpacing: 'var(--ds-tracking-caption)',
          },
        ],
      },
      spacing: {
        0: 'var(--ds-space-0)',
        1: 'var(--ds-space-1)',
        2: 'var(--ds-space-2)',
        3: 'var(--ds-space-3)',
        4: 'var(--ds-space-4)',
        5: 'var(--ds-space-5)',
        6: 'var(--ds-space-6)',
        7: 'var(--ds-space-7)',
        8: 'var(--ds-space-8)',
        9: 'var(--ds-space-9)',
        10: 'var(--ds-space-10)',
        11: 'var(--ds-space-11)',
        12: 'var(--ds-space-12)',
        'section-y': 'var(--ds-space-section-y)',
        'hero-y': 'var(--ds-space-hero-y)',
        'grid-gutter': 'var(--ds-space-grid-gutter)',
        'target-min': 'var(--ds-target-min)',
      },
      maxWidth: {
        container: 'var(--ds-container-max)',
        measure: 'var(--ds-measure)',
      },
      borderRadius: {
        xs: 'var(--ds-radius-xs)',
        sm: 'var(--ds-radius-sm)',
        md: 'var(--ds-radius-md)',
        lg: 'var(--ds-radius-lg)',
        xl: 'var(--ds-radius-xl)',
        pill: 'var(--ds-radius-pill)',
      },
      boxShadow: {
        1: 'var(--ds-shadow-1)',
        2: 'var(--ds-shadow-2)',
        3: 'var(--ds-shadow-3)',
        4: 'var(--ds-shadow-4)',
        contact: 'var(--ds-shadow-contact)',
        ambient: 'var(--ds-shadow-ambient)',
        'accent-glow': 'var(--ds-shadow-accent-glow)',
      },
      blur: {
        0: 'var(--ds-blur-0)',
        1: 'var(--ds-blur-1)',
        2: 'var(--ds-blur-2)',
        3: 'var(--ds-blur-3)',
        glass: 'var(--ds-blur-glass)',
        5: 'var(--ds-blur-5)',
        6: 'var(--ds-blur-6)',
      },
      backdropBlur: {
        glass: 'var(--ds-blur-glass)',
      },
      transitionDuration: {
        instant: 'var(--ds-dur-instant)',
        fast: 'var(--ds-dur-fast)',
        standard: 'var(--ds-dur-standard)',
        slow: 'var(--ds-dur-slow)',
        page: 'var(--ds-dur-page)',
        scene: 'var(--ds-dur-scene)',
        hero: 'var(--ds-dur-hero)',
      },
      transitionTimingFunction: {
        standard: 'var(--ds-ease-standard)',
        out: 'var(--ds-ease-out)',
        in: 'var(--ds-ease-in)',
        'in-out': 'var(--ds-ease-in-out)',
      },
      zIndex: {
        base: 'var(--ds-z-base)',
        media: 'var(--ds-z-media)',
        glass: 'var(--ds-z-glass)',
        floating: 'var(--ds-z-floating)',
        controls: 'var(--ds-z-controls)',
        nav: 'var(--ds-z-nav)',
        dropdown: 'var(--ds-z-dropdown)',
        overlay: 'var(--ds-z-overlay)',
        modal: 'var(--ds-z-modal)',
        toast: 'var(--ds-z-toast)',
        tooltip: 'var(--ds-z-tooltip)',
      },
    },
  },
  plugins: [],
}

export default config
