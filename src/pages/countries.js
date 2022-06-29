import * as React from 'react'

import {
  Text,
  Heading,
  List,
  Box,
  VStack,
  ListIcon,
  ListItem,
  Link,
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import Seo from '../components/seo'

const Countries = () => {
  return (
    <>
      <Seo title="Countries" />
      <Box marginBottom="2rem">
        <VStack spacing={8}>
          <VStack>
            <Heading fontSize="4xl">
              <span role="img" aria-label="Tools">
                🛬
              </span>{' '}
              Countries
            </Heading>
            <Text fontSize="2xl" color="white" textAlign="center">
              A map of the countries I've visited!
            </Text>
          </VStack>
        </VStack>
      </Box>
    </>
  )
}

export default Countries
