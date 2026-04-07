import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bpl-blue':       '#0078D4',
        'bpl-blue-light': '#3399E0',
        'bpl-blue-pale':  '#E8F4FD',
        'bpl-navy':       '#0D1B2A',
        'bpl-navy-mid':   '#1A2E42',
        'bpl-red':        '#CC0000',
        'bpl-tan':        '#D4A882',
        'bpl-off-white':  '#F7F9FC',
        'bpl-light-gray': '#EEF2F7',
        'bpl-mid-gray':   '#9BAAB8',
        'bpl-body':       '#3D5166',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
