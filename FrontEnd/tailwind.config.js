const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_3000 = { ...Array.from(Array(3001)).map((_, i) => `${i}px`) };

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
      fontSize: px0_100,
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
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, 318px)',
      },
      keyframes: {
        'skeleton-gradient': {
          '0%': {
            'background-color': 'rgba(165, 165, 165, 0.7)',
          },
          '50%': {
            'background-color': 'rgba(165, 165, 165, 0.99)',
          },
          '100%': {
            'background-color': 'rgba(165, 165, 165, 0.7)',
          },
        },
      },
      animation: {
        'skeleton-gradient': 'skeleton-gradient 1.35s infinite ease-in-out',
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp')],
};
