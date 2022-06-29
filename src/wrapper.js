import React from 'react'
import Layout from './components/layout'

import { theme } from './theme'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
          initialColorMode: 'dark',
        }}
      />
      <Layout>{element}</Layout>
    </ChakraProvider>
  )
}
