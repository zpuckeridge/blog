import React from 'react'
import Layout from './components/layout'

import { theme } from './theme'
import { ChakraProvider } from '@chakra-ui/react'

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>{element}</Layout>
    </ChakraProvider>
  )
}
