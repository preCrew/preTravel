const plugin = require('tailwindcss/plugin');
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_3000 = { ...Array.from(Array(3001)).map((_, i) => `${i}px`) };
const remCalculate = px => px / 16 + 'rem';
const contentBasicPx = 22;

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    screens: {
      xsm: '320px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontSize: {
        h4: [
          remCalculate(20),
          {
            lineHeight: remCalculate(24),
            fontWeight: '400',
          },
        ],
        h4Bold: [
          remCalculate(20),
          {
            lineHeight: remCalculate(24),
            fontWeight: '800',
          },
        ],
        h5: [
          remCalculate(16),
          {
            lineHeight: remCalculate(24),
            fontWeight: '400',
          },
        ],
        h5Bold: [
          remCalculate(16),
          {
            lineHeight: remCalculate(24),
            fontWeight: '800',
          },
        ],
        body1: [remCalculate(14), remCalculate(20)],
        body1Bold: [
          remCalculate(14),
          {
            lineHeight: remCalculate(20),
            fontWeight: '800',
          },
        ],
        body2: [remCalculate(13), remCalculate(18)],
        body2Bold: [
          remCalculate(13),
          {
            lineHeight: remCalculate(18),
            fontWeight: '800',
          },
        ],
        body3: [remCalculate(12), remCalculate(18)],
        body3Bold: [
          remCalculate(12),
          {
            lineHeight: remCalculate(18),
            fontWeight: '800',
          },
        ],
        body4: [remCalculate(10), remCalculate(15)],
        body4Bold: [
          remCalculate(10),
          {
            lineHeight: remCalculate(14),
            fontWeight: '800',
          },
        ],
      },
      width: px0_3000,
      height: px0_3000,
      fontWeight: {
        regular: 400, // 기본
        medium: 500,
        bold: 700,
      },
      padding: {
        inner: remCalculate(contentBasicPx),
      },
      borderRadius: {
        DEFAULT: '20px',
      },
      spacing: {
        basic: remCalculate(contentBasicPx),
      },
      colors: {
        primary1: 'var(--primary1)',
        primary2: 'var(--primary2)',
        primary3: 'var(--primary3)',
        primary4: 'var(--primary4)',
        primary8: 'var(--primary8)',
        gray1: 'var(--gray1)',
        gray2: 'var(--gray2)',
        gray3: 'var(--gray3)',
        gray4: 'var(--gray4)',
        gray5: 'var(--gray5)',
        red1: 'var(--red1)',
        green1: 'var(--green1)',
      },
      keyframes: {
        pulseRing: {
          '0%': {
            transform: 'scale(.33)',
          },
          '80%, 100%': {
            opacity: 0,
          },
        },
        pulseDot: {
          '0%': {
            transform: 'scale(.8)',
          },
          '50%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(.8)',
          },
        },
        down: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        up: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        skeletonData: {
          to: {
            backgroundPosition: '100% 13px, 16px 13px, 0 49px',
          },
        },
      },
      animation: {
        down: 'down 1.0s ease-in-out',
        up: 'up 1.0s ease-in-out',
        skeletonData: 'skeletonData 1.5s infinite ',
        'pulse-dot':
          'pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
        'pulse-ring':
          'pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': {
            transform: 'scale(.33)',
          },
          '80%, 100%': {
            opacity: 0,
          },
        },
        pulseDot: {
          '0%': {
            transform: 'scale(.8)',
          },
          '50%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(.8)',
          },
        },
        down: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        up: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        skeletonData: {
          to: {
            backgroundPosition: '100% 13px, 16px 13px, 0 49px',
          },
        },
      },
      animation: {
        down: 'down 1.0s ease-in-out',
        up: 'up 1.0s ease-in-out',
        skeletonData: 'skeletonData 1.5s infinite ',
        'pulse-dot':
          'pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
        'pulse-ring':
          'pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': {
            transform: 'scale(.33)'
          },
          '80%, 100%': {
            opacity: 0
          }
        },
        pulseDot: {
          '0%': {
            transform: 'scale(.8)'
          },
          '50%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(.8)'
          }
        },        
        down: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        up: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        skeletonData: {
          to: {
            backgroundPosition: '100% 13px, 16px 13px, 0 49px',
          },
        },
      },
      animation: {
        down: 'down 1.0s ease-in-out',
        up: 'up 1.0s ease-in-out',
        skeletonData: 'skeletonData 1.5s infinite ',
        'pulse-dot': 'pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
        'pulse-ring': 'pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'        
      },
      keyframes: {
        pulseRing: {
          '0%': {
            transform: 'scale(.33)'
          },
          '80%, 100%': {
            opacity: 0
          }
        },
        pulseDot: {
          '0%': {
            transform: 'scale(.8)'
          },
          '50%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(.8)'
          }
        },        
        down: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        up: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        skeletonData: {
          to: {
            backgroundPosition: '100% 13px, 16px 13px, 0 49px',
          },
        },
      },
      animation: {
        down: 'down 1.0s ease-in-out',
        up: 'up 1.0s ease-in-out',
        skeletonData: 'skeletonData 1.5s infinite ',
        'pulse-dot': 'pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
        'pulse-ring': 'pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'        
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.safe-top': {
          paddingTop: 'constant(safe-area-inset-top) env(safe-area-inset-top)',
          // paddingTop: 'env(safe-area-inset-top)',
          paddingTop: 'constant(safe-area-inset-top) env(safe-area-inset-top)',
          // paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-left': {
          paddingLeft:
            'constant(safe-area-inset-left) env(safe-area-inset-left)',
          // paddingLeft: 'env(safe-area-inset-left)',
          paddingLeft:
            'constant(safe-area-inset-left) env(safe-area-inset-left)',
          // paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight:
            'constant(safe-area-inset-right) env(safe-area-inset-right)',
          // paddingRight: 'env(safe-area-inset-right)',
          paddingRight:
            'constant(safe-area-inset-right) env(safe-area-inset-right)',
          // paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-bottom': {
          paddingBottom:
            'constant(safe-area-inset-bottom) env(safe-area-inset-bottom)',
          // paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.flex-with-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.w-h-full': {
          width: '100%',
          height: '100%',
        },
        '.skeleton-data': {
          '--data-num': 'calc(100%/50)',
          '--data-height': 'calc(50 * var(--data-num))',

          width: '100%',
          height: 'var(--data-height)',
          paddingLeft: '1rem',

          backgroundImage:
            'linear-gradient( 90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0) 70% ), linear-gradient(var(--gray3) 20px, transparent 0), linear-gradient(var(--gray3) 1px, transparent 0)',
          backgroundPosition: '16px 13px, 16px 13px, 0 49px',
          backgroundSize: '50px 50px, 60% 50px, 100% 50px',
          backgroundRepeat: 'repeat-y',
          animation: 'skeletonData 2s infinite',
        },
        '.no-scroll': {
          overflow: 'hidden',
        },
        '.content-inner': {
          padding: 'var(--contentX)',
        },
      };

      addUtilities(newUtilities);
    }, require('@mertasan/tailwindcss-variables')),
  ],
};
