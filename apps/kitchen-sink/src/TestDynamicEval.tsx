// debug
import { useTheme } from '@tamagui/core'
import { SafeAreaView, ScrollView } from 'react-native'

import Box from './components/Box'
import Heading from './components/Heading'

export const TestDynamicEval = () => {
  const theme = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <Box flex={1} bg="$background" space="$0">
        <Box py="$xs" fd="row" ai="center" px="$0" jc="space-between">
          <Heading size="h1">Weather app</Heading>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box space="$3" px="$0"></Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}
