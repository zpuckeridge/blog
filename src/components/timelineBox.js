import * as React from 'react'

import {
  Text,
  Heading,
  List,
  Box,
  VStack,
  Flex,
  ListIcon,
  chakra,
  Center,
  Divider,
  ListItem,
  Link,
} from '@chakra-ui/react'

const timelineBox = () => {
  return (
    <Flex>
      <Box
        px={8}
        py={4}
        rounded="7px"
        border="1px"
        minWidth="full"
        boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
        bg={'brand.800'}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span fontSize="sm" color="#c3c8d3">
            test
          </chakra.span>
        </Flex>
      </Box>
    </Flex>
  )
}

export default timelineBox
