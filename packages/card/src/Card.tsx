import { ScopedProps } from '@tamagui/create-context'
import { ThemeableStack } from '@tamagui/stacks'
import {
  GetProps,
  TamaguiElement,
  isTamaguiElement,
  styled,
  withStaticProperties,
} from '@tamagui/web'
import React, { cloneElement, forwardRef } from 'react'

// const CARD_NAME = 'CARD'

// type CardContextValue = {
//   size?: SizeTokens
// }

// const [createCardContext, createCardScope] = createContextScope(CARD_NAME)
// const [CardProvider, useCardContext] = createCardContext<CardContextValue>(CARD_NAME)

export const CardFrame = styled(ThemeableStack, {
  name: 'Card',

  variants: {
    size: {
      '...size': (val, { tokens }) => {
        return {
          borderRadius: tokens.radius[val] ?? val,
        }
      },
    },

    unstyled: {
      false: {
        backgrounded: true,
        position: 'relative',
        overflow: 'hidden',
        size: '$true',
      },
    },
  } as const,

  defaultVariants: {
    unstyled: false,
  },
})

export const CardHeader = styled(ThemeableStack, {
  name: 'CardHeader',

  variants: {
    size: {
      '...size': (val, { tokens }) => {
        return {
          padding: tokens.space[val] ?? val,
        }
      },
    },

    unstyled: {
      false: {
        zIndex: 10,
        marginBottom: 'auto',
      },
    },
  } as const,

  defaultVariants: {
    unstyled: false,
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
    unstyled: false,
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
  },

  defaultVariants: {
    unstyled: false,
  },
})

export type CardHeaderProps = GetProps<typeof CardHeader>
export type CardFooterProps = GetProps<typeof CardFooter>
export type CardProps = GetProps<typeof CardFrame>

export const Card = withStaticProperties(
  CardFrame.extractable(
    forwardRef<TamaguiElement, ScopedProps<CardProps, 'Card'>>(
      ({ size, __scopeCard, children, ...props }, ref) => {
        return (
          // <CardProvider scope={__scopeCard} size={size}>
          <CardFrame ref={ref} {...props}>
            {React.Children.map(children, (child) => {
              if (isTamaguiElement(child) && !child.props.size) {
                return cloneElement(child, {
                  size,
                })
              }
              return child
            })}
          </CardFrame>
          // </CardProvider>
        )
      }
    )
  ),
  {
    Header: CardHeader,
    Footer: CardFooter,
    Background: CardBackground,
  }
)

// export { createCardScope, useCardContext }
