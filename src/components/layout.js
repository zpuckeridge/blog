import * as React from 'react'
import Header from './header'
import Footer from './footer'

import { Box } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <>
      <Box bg="brand.900">
        <Header />
        <Box
          bg="brand.900"
          as="main"
          margin="0 auto"
          maxWidth="40rem"
          pt={8}
          pb={8}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
