import React from 'react'

import { Link, Heading, Text, Box, Button } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'

import Seo from '../components/seo'

const NotFoundPage = () => (
  <>
    <Seo title="404: Page not found..." />
    <Box h="100vh">
      <Heading>404: Page not found...</Heading>
      <Text fontSize="xl" my={5}>
        It appears that this page doesn't exist or is currently in
        development. Sorry about that!
      </Text>
      <Link as={GatsbyLink} to="/" title="Home">
        <Button>Take me home →</Button>
      </Link>
    </Box>
  </>
)

export default NotFoundPage
