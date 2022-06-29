import * as React from 'react'
import Header from './header'
import Footer from './footer'
import PillPity from 'pill-pity'

import { Box } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <>
      <PillPity
        pattern="topography"
        fontWeight="bold"
        patternFill="#d9d9d9"
        bgColor="#000000"
        patternOpacity={0.1}
      >
        <Box>
          <Header />
          <Box margin="0 auto" maxWidth="40rem" p={4}>
            {children}
          </Box>
          {/* <Footer /> */}
        </Box>
      </PillPity>
    </>
  )
}

export default Layout
