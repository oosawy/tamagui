import { MotiTransitionProp, MotiView } from '@tamagui/animations-moti'
// https://github.com/nandorojo/moti/blob/master/packages/moti/src/skeleton/skeleton-new.tsx
import React, { createContext, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import type Animated from 'react-native-reanimated'

import {
  DEFAULT_SKELETON_SIZE as DEFAULT_SIZE,
  baseColors,
  defaultDarkColors,
  defaultLightColors,
} from './shared'
import { MotiSkeletonProps } from './types'
import { Circle, CircleProps, Paragraph, Square, YStack, withStaticProperties } from 'tamagui'
import {LinearGradient} from 'expo-linear-gradient'

type InnerCompoentProps = CircleProps & {
  shape?: 'circle' | 'square' | undefined
}

function InnerComponent(props: InnerCompoentProps) {
  const { children, shape, borderRadius = 8, ...rest } = props
  if (shape === 'circle') {
    return <Circle {...rest}>{children}</Circle>
  } else if (shape === 'square') {
    return <Square borderRadius={borderRadius} {...rest}>{children}</Square>
  } else {
    return <YStack borderRadius={borderRadius} {...rest}>{children}</YStack>
  }
}

const AnimatedGradientContext = createContext<{
  measuredWidthSv: Animated.SharedValue<number> | undefined
  show: boolean
  backgroundSize: number | undefined,
  colors: string[] | undefined,
  colorMode: 'dark' | 'light' | undefined
  transition: MotiTransitionProp | undefined
  disableExitAnimation: boolean | undefined
}>({
  measuredWidthSv: undefined,
  show: false,
  backgroundSize: undefined,
  colors: undefined,
  colorMode: undefined,
  transition: undefined,
  disableExitAnimation: undefined
})


export default function SkeletonFrame(props: MotiSkeletonProps) {
  const skeletonGroupContext = useContext(SkeletonGroupContext)
  const {
    shape,
    children,
    show = skeletonGroupContext ?? !children,
    width,
    height = children ? undefined : DEFAULT_SIZE,
    boxHeight,
    colorMode = 'dark',
    colors = colorMode === 'dark' ? defaultDarkColors : defaultLightColors,
    backgroundColor = colors[0] ?? colors[1] ?? baseColors[colorMode]?.secondary,
    backgroundSize = 6,
    disableExitAnimation,
    transition,
  } = props

  const measuredWidthSv = useSharedValue(0)


  const outerHeight = (() => {
    if (boxHeight != null) return boxHeight
    if (show && !children) {
      return height
    }
    return undefined
  })()

  return (
    <View
      // @ts-expect-error - From Moti, come back to this
      style={{
        height: outerHeight,
        minHeight: height,
        minWidth: width ?? (children ? undefined : DEFAULT_SIZE),
      }}
    >
      <InnerComponent
        position='absolute'
        top={0}
        left={0}
        shape={shape}
        width={width ?? (children ? '100%' : DEFAULT_SIZE)}
        height={height ?? '100%'}
        overflow='hidden'
        backgroundColor={show ? backgroundColor : undefined}
        onLayout={({ nativeEvent }) => {
          if (measuredWidthSv.value !== nativeEvent.layout.width) {
            measuredWidthSv.value = nativeEvent.layout.width
          }
        }}
        pointerEvents="none"
      >
        <AnimatedGradientContext.Provider value={{
          measuredWidthSv,
          show,
          backgroundSize,
          colors,
          colorMode,
          transition,
          disableExitAnimation
        }}>
         {children}
          {/* {disableExitAnimation && !show ? null : (
            <AnimatedGradient
              // force a key change to make the loop animation re-mount
              key={colors.join(',')}
            />
          )} */}
        </AnimatedGradientContext.Provider>
      </InnerComponent>
    </View >
  )
}

  function AnimatedGradient() {
    const { show, transition, measuredWidthSv, disableExitAnimation, colorMode, backgroundSize = 6 } = useContext(AnimatedGradientContext)

    const colors = colorMode === 'dark' ? defaultDarkColors : defaultLightColors;
    if (!measuredWidthSv) {
      return null
    }

    if (disableExitAnimation && !show) {
      console.log('do i happen')
      return null
    }

      console.log('do i happen', 'measured width')
    return (
      <MotiView
        style={[
          StyleSheet.absoluteFillObject,
          useAnimatedStyle(
            () => ({
              width: measuredWidthSv.value * backgroundSize,
            }),
            [backgroundSize, measuredWidthSv]
          ),
        ]}
        from={{
          opacity: 0,
          translateX: 0,
        }}
        // @ts-expect-error - From Moti, come back to this
        animate={useDerivedValue(() => {
          return {
            opacity: show ? 1 : 0,
            translateX: -measuredWidthSv.value * (backgroundSize - 1),
          }
        }, [measuredWidthSv, show])}
        transition={{
          translateX: {
            type: 'timing',

            loop: show,
            delay: 200,
            duration: 3000,
          },
          opacity: {
            type: 'timing',
            delay: 0,
            duration: 200,
          },
          ...(transition as any),
        }}
      >
        <LinearGradient
          colors={colors}
          start={{
            x: 0.1,
            y: 1,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </MotiView>
    )
  }

const SkeletonGroupContext = createContext<boolean | undefined>(undefined)

function SkeletonGroup({
  children,
  show,
}: {
  children: React.ReactNode
  /**
   * If `true`, all `Skeleton` children components will be shown.
   *
   * If `false`, the `Skeleton` children will be hidden.
   */
  show: boolean
}) {
  return (
    <SkeletonGroupContext.Provider value={show}>{children}</SkeletonGroupContext.Provider>
  )
}

// Skeleton.Group = SkeletonGroup
export const Skeleton = withStaticProperties(SkeletonFrame, {
  Group: SkeletonGroup,
  Gradient: AnimatedGradient
})
