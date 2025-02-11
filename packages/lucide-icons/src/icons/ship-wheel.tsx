import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import {
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Use,
  Circle as _Circle,
  Text as _Text,
} from 'react-native-svg'

const Icon = (props) => {
  const { color = 'black', size = 24, ...otherProps } = props
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <_Circle cx="12" cy="12" r="8" stroke={color} />
      <Path d="M12 2v7.5" stroke={color} />
      <Path d="m19 5-5.23 5.23" stroke={color} />
      <Path d="M22 12h-7.5" stroke={color} />
      <Path d="m19 19-5.23-5.23" stroke={color} />
      <Path d="M12 14.5V22" stroke={color} />
      <Path d="M10.23 13.77 5 19" stroke={color} />
      <Path d="M9.5 12H2" stroke={color} />
      <Path d="M10.23 10.23 5 5" stroke={color} />
      <_Circle cx="12" cy="12" r="2.5" stroke={color} />
    </Svg>
  )
}

Icon.displayName = 'ShipWheel'

export const ShipWheel = memo<IconProps>(themed(Icon))
