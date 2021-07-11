import React from 'react'
import { VStack, Text, Heading, SimpleGrid } from '@chakra-ui/react'

const Bookmarks = ({ bookmarks }) => {
  return (
    <VStack spacing={8}>
      <VStack>
        <Heading fontSize="5xl">Bookmarks</Heading>
        <Text
          fontSize={['xl', '2xl']}
          color="white"
          textAlign="center"
        >
          Some awesome resources I've found helpful or interesting.
        </Text>
      </VStack>
      <SimpleGrid columns={[2, 3]} spacing={4}></SimpleGrid>
    </VStack>
  )
}

export default Bookmarks
