import * as React from 'react'
import Header from './header'
import Footer from './footer'
import PillPity from 'pill-pity'

import { Box } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <>
      <Box bg="#121212">
        <PillPity
          pattern="topography"
          fontWeight="bold"
          patternFill="gray.600"
          bgColor="#121212"
          patternOpacity={0.1}
        >
          <Header />
          <Box margin="0 auto" maxWidth="40rem" p={4}>
            {children}
          </Box>
          <Footer />
        </PillPity>
      </Box>
    </>
  )
}

export default Layout
