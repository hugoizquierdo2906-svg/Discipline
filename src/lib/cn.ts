import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge configured with DISCIPLINE's custom font-size scale. Without
 * this, names like `text-body` are mistaken for text *colors* and collide with
 * real color utilities (e.g. `text-text-on-accent`), silently dropping them.
 * Registering them as font sizes keeps size and color in separate conflict
 * groups so both survive a merge.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-1',
            'display-2',
            'display-3',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'body-lg',
            'body',
            'body-sm',
            'caption',
          ],
        },
      ],
    },
  },
})

/**
 * Merge class names: clsx for conditional composition, tailwind-merge to
 * resolve conflicting Tailwind utilities (last one wins). Used by every
 * Level 1 primitive.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
