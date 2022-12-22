import { defineStyleConfig, extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {
  body: "'Ubuntu', sans-serif",
};

const components = {
  Button: defineStyleConfig({
    variants: {
      main: {
        bgColor: 'transparent',
        _hover: {
          bgColor: 'whiteAlpha.600',
        },
        p: 1,
        color: 'gray.300',
        borderRadius: 'none',
      },
    },
  }),
};

export const chakraColor = (color: string, variant?: string) =>
  `var(--chakra-colors-${color}${variant ? `-${variant}` : ''})`;

export const chakraSpace = (type: string | number) =>
  `var(--chakra-space-${type})`;

export default extendTheme({ config, fonts, components });
