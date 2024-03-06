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
      }
    }
  },
  plugins: []
}
export default config
