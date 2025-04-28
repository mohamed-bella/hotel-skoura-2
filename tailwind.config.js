/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f6f2',
          100: '#f1ebe1',
          200: '#e6d9c4',
          300: '#d7c2a3',
          400: '#c9ab81',
          500: '#b99367', // terracotta/earth tone
          600: '#a77c55',
          700: '#8b6243',
          800: '#704f38',
          900: '#5c422f',
        },
        secondary: {
          50: '#f0f7f7',
          100: '#d9eaeb',
          200: '#b7d9d9',
          300: '#92c5c5',
          400: '#66adad',
          500: '#438e8e', // moroccan teal/blue
          600: '#337272',
          700: '#2b5e5e',
          800: '#264d4d',
          900: '#1f3f3f',
        },
        accent: {
          50: '#faf3f0',
          100: '#f8e5db',
          200: '#f2cdb6',
          300: '#ebaf8d',
          400: '#e3926a',
          500: '#d97a4d', // moroccan spice/orange
          600: '#c45a31',
          700: '#a44228',
          800: '#853625',
          900: '#6d2e22',
        },
        neutral: {
          50: '#f9f9f8',
          100: '#f1f1ef',
          200: '#e5e5e1',
          300: '#d1d0c9',
          400: '#adaba1',
          500: '#89877c',
          600: '#6c6a60',
          700: '#56544b',
          800: '#454540',
          900: '#252420',
        },
        sand: {
          50: '#fcfaf5',
          100: '#f9f5ea',
          200: '#f3ead4',
          300: '#eaddb9',
          400: '#e0c999',
          500: '#d6b679', // sand/desert tone
          600: '#c39a54',
          700: '#a47e41',
          800: '#866439',
          900: '#6f5232',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'medium': '0 6px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'pattern-geometric': "url('/patterns/moroccan-geometric.svg')",
        'pattern-zellige': "url('/patterns/moroccan-zellige.svg')",
        'pattern-arabesque': "url('/patterns/moroccan-arabesque.svg')",
      }
    }
  },
  plugins: [],
}