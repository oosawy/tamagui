import { withStaticProperties } from '@tamagui/core'
import { createNativeMenu, useNativeProp, withNativeMenu } from '@tamagui/menu'
import React from 'react'

import {
  CONTEXTMENU_CONTEXT,
  ContextMenu as NonNativeContextMenu,
} from './NonNativeContextMenu'

const COMMON_PARAMS = {
  isRoot: false,
  useNativeProp,
  useNativePropScope: CONTEXTMENU_CONTEXT,
}

const { Menu: NativeMenuRoot } = createNativeMenu('ContextMenu')

const ContextMenuComp = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Root,
  NativeComponent: NativeMenuRoot,
  isRoot: true,
})

const Trigger = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Trigger,
  NativeComponent: NativeMenuRoot.Trigger,
})
const Portal = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Portal,
  NativeComponent: React.Fragment,
})
const Content = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Content,
  NativeComponent: NativeMenuRoot.Content,
})
const Preview = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Preview,
  NativeComponent: NativeMenuRoot.Preview,
})
const Group = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Group,
  NativeComponent: NativeMenuRoot.Group,
})
const Label = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Label,
  NativeComponent: NativeMenuRoot.Label,
})
const Item = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Item,
  NativeComponent: NativeMenuRoot.Item,
})
const ItemTitle = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.ItemTitle,
  NativeComponent: NativeMenuRoot.ItemTitle,
})
const ItemSubtitle = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.ItemSubtitle,
  NativeComponent: NativeMenuRoot.ItemSubtitle,
})

const ItemIcon = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.ItemIcon,
  NativeComponent: NativeMenuRoot.ItemIcon,
})

const ItemImage = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.ItemImage,
  NativeComponent: NativeMenuRoot.ItemImage,
})

const CheckboxItem = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.CheckboxItem,
  NativeComponent: NativeMenuRoot.CheckboxItem,
})
const RadioGroup = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.RadioGroup,
  NativeComponent: () => null,
})
const RadioItem = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.RadioItem,
  NativeComponent: ({ children }) => children,
})
const ItemIndicator = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.ItemIndicator,
  NativeComponent: NativeMenuRoot.ItemIndicator,
})
const Separator = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Separator,
  NativeComponent: NativeMenuRoot.Separator,
})
const Arrow = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Arrow,
  NativeComponent: NativeMenuRoot.Arrow,
})
const Sub = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.Sub,
  NativeComponent: NativeMenuRoot.Sub,
})
const SubTrigger = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.SubTrigger,
  NativeComponent: NativeMenuRoot.SubTrigger,
})
const SubContent = withNativeMenu({
  ...COMMON_PARAMS,
  Component: NonNativeContextMenu.SubContent,
  NativeComponent: NativeMenuRoot.SubContent,
})

export const ContextMenu = withStaticProperties(ContextMenuComp, {
  Trigger,
  Portal,
  Content,
  Group,
  Label,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  Arrow,
  Sub,
  SubTrigger,
  SubContent,
  ItemTitle,
  ItemSubtitle,
  ItemIcon,
  ItemImage,
  Preview,
})

export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuItemIndicatorProps,
  ContextMenuSeparatorProps,
  ContextMenuArrowProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuItemIconProps,
  ContextMenuItemImageProps,
} from './NonNativeContextMenu'
