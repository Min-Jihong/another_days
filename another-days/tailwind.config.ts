import type { Config } from 'tailwindcss';
import typography from './typography-plugin';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [typography],
  theme: {
    extend: {
      screens: {
        mobile: '0px',
        tablet: '600px',
        laptop: '860px',
        desktop: '1200px',
      },
      fontFamily: {
        space: ['var(--font-space)'],
      },
      colors: {
        primary: '#423040',
        secondary: '#894f5e',
        tertiary: '#f6b161',
      },
      keyframes: {
        routing: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '50%': { transform: 'translateX(50px)', opacity: '0.5' },
          '100%': { transform: 'translateX(100px)', opacity: '0' },
        },
      },
      animation: {
        routing: 'routing 0.3s ease-in-out',
      },
    },
  },
} satisfies Config;
