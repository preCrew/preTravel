const plugin = require('tailwindcss/plugin')
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_3000 = { ...Array.from(Array(3001)).map((_, i) => `${i}px`) };
const remCalculate = (px) =>  (px / 16) + 'rem';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontSize: {
        h4: [remCalculate(20),{
          lineHeight:remCalculate(24),
          fontWeight:'400'
        }],
        h4Bold: [remCalculate(20),{
          lineHeight:remCalculate(24),
          fontWeight:'800'
        }],        
        h5: [remCalculate(16),{
          lineHeight:remCalculate(24),
          fontWeight:'400'
        }],
        h5Bold: [remCalculate(16),{
          lineHeight:remCalculate(24),
          fontWeight:'800'
        }],        
        body1: [remCalculate(14),remCalculate(20)],
        body1Bold: [remCalculate(14),{
          lineHeight:remCalculate(20),
          fontWeight:'800'
        }],
        body2: [remCalculate(13),remCalculate(18)],
        body2Bold: [remCalculate(13),{
          lineHeight:remCalculate(18),
          fontWeight:'800'
        }],
        body3: [remCalculate(12),remCalculate(18)],
        body3Bold: [remCalculate(12),{
          lineHeight:remCalculate(18),
          fontWeight:'800'
        }],
        body4: [remCalculate(10),remCalculate(15)],
        body4Bold: [remCalculate(10),{
          lineHeight:remCalculate(14),
          fontWeight:'800'
        }],
      },
      width: px0_3000,
      height: px0_3000,
      fontWeight: {
        regular: 400, // 기본
        medium: 500,
        bold: 700,
      },
      colors: {
        primary1: '#5698F3',
        primary2: '#D84243',
        primary3: '#F09CD5',
        gray1: '#787878',
        gray2: '#F6F6F6',
        gray3: '#eeeeee',
        gray4: '#eeeeee',
        gray4: '#F2F5F9',
      },
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
      plugin(function({ addUtilities }){
        const newUtilities = {
            '.safe-top' : {
                paddingTop: 'constant(safe-area-inset-top)',
                paddingTop: 'env(safe-area-inset-top)'
            },
            '.safe-left' : {
                paddingLeft: 'constant(safe-area-inset-left)',
                paddingLeft: 'env(safe-area-inset-left)'
            },
            '.safe-right' : {
                paddingRight: 'constant(safe-area-inset-right)',
                paddingRight: 'env(safe-area-inset-right)'
            },
            '.safe-bottom' : {
                paddingBottom: 'constant(safe-area-inset-bottom)',
                paddingBottom: 'env(safe-area-inset-bottom)'
            }
        }

        addUtilities( newUtilities );
    })    
  ],
};