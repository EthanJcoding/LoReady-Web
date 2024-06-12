import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)']
      },
      colors: {
        light: '#f8fafb',
        dark: '#272727',
        'primary-gray': '#9b9b9b',
        'secondary-gray': '#dde1e6',
        'primary-blue': '#c7e1ee',
        'secondary-blue': '#edfcff',
        'primary-accent': '#00a4e8',
        'secondary-accent': '#ffd2d6'
      },
      keyframes: {
        upward: {
          '0%': { top: '4rem' },
          '50%': { top: '1rem' },
          '100%': { top: '2.5rem' }
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
        blink: {
          '50%': { 'border-color': 'transparent' }
        }
      },
      animation: {
        toast: 'upward .3s ease-in-out',
        'typed-out': 'typing 1.5s steps(20, end) .5s forwards, blink .5s step-end 2.5s infinite alternate'
      }
    }
  },
  plugins: []
}
export default config
