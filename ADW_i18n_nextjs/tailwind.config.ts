import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Apple SD Gothic Neo', 'Noto Sans JP', 'Noto Sans SC', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: []
} satisfies Config
