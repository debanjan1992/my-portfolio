import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const PortfolioThemePreset = definePreset(Aura, {
  primitive: {

  },
  semantic: {
    colorScheme: {
      light: {
        content: {
          borderColor: '{zinc.800}',
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.950}',
          100: '{zinc.900}',
          200: '{zinc.800}',
          300: '{zinc.700}',
          400: '{zinc.600}',
          500: '{zinc.500}',
          600: '{zinc.400}',
          700: '{zinc.300}',
          800: '{zinc.200}',
          900: '{zinc.100}',
          950: '{zinc.50}',
        },
      },
      dark: {
        content: {
          borderColor: '{zinc.800}',
        },
        linkedIn: 'red',
        surface: {
          0: '#ffffff',
          50: '{stone.50}',
          100: '{stone.100}',
          200: '{stone.200}',
          300: '{stone.300}',
          400: '{stone.400}',
          500: '{stone.500}',
          600: '{stone.600}',
          700: '{stone.700}',
          800: '{stone.800}',
          900: '{stone.900}',
          950: '{stone.950}',
        },
      },
    },
    primary: {
      50: '{rose.50}',
      100: '{rose.100}',
      200: '{rose.200}',
      300: '{rose.300}',
      400: '{rose.400}',
      500: '{rose.500}',
      600: '{rose.600}',
      700: '{rose.700}',
      800: '{rose.800}',
      900: '{rose.900}',
      950: '{rose.950}',
    },
  },
});
