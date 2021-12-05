import React from 'react'

import { Link, Heading, Text, Box, Button } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'

// centered 404 page to browser window
const NotFoundPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Heading as="h1" size="2xl" fontWeight="bold">
      404
    </Heading>
    <Text fontSize="xl">Page not found</Text>
    <Link as={GatsbyLink} to="/">
      <Button variantColor="blue" variant="outline">
        Go to Home
      </Button>
    </Link>
  </Box>
)

export default NotFoundPage
