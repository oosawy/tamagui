import { withStaticProperties } from '@tamagui/helpers'
import { ThemeableStack } from '@tamagui/stacks'
import { GetProps, SizeTokens, createStyledContext, styled } from '@tamagui/web'
const CardContext = createStyledContext({
  size: '$true' as SizeTokens,
})

export const CardFrame = styled(ThemeableStack, {
  name: 'Card',
  context: CardContext,

  variants: {
    unstyled: {
      false: {
        size: '$true',
        backgroundColor: '$background',
        position: 'relative',
      },
    },

    size: {
      '...size': (val, { tokens }) => {
        return {
          borderRadius: tokens.radius[val] ?? val,
        }
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})

export const CardHeader = styled(ThemeableStack, {
  name: 'CardHeader',
  context: CardContext,

  variants: {
    unstyled: {
      false: {
        zIndex: 10,
        backgroundColor: 'transparent',
        marginBottom: 'auto',
      },
    },

    size: {
      '...size': (val, { tokens }) => {
        return {
          padding: tokens.space[val] ?? val,
        }
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})

export const CardFooter = styled(CardHeader, {
  name: 'CardFooter',

  variants: {
    unstyled: {
      false: {
        zIndex: 5,
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 0,
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})

export const CardBackground = styled(ThemeableStack, {
  name: 'CardBackground',

  variants: {
    unstyled: {
      false: {
        zIndex: 0,
        fullscreen: true,
        overflow: 'hidden',
        pointerEvents: 'none',
        padding: 0,
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})

type CreateCardProps = {
  Frame: React.FC<{}>
  Background: React.FC<{}>
  Footer: React.FC<{}>
  Header: React.FC<{}>
}

export function createCard(props: CreateCardProps) {
  return withStaticProperties(props.Frame, {
    Header: props.Header,
    Footer: props.Footer,
    Background: props.Background,
  })
}

export type CardHeaderProps = GetProps<typeof CardHeader>
export type CardFooterProps = GetProps<typeof CardFooter>
export type CardProps = GetProps<typeof CardFrame>
