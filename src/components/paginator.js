import React from 'react'

import { Flex } from '@chakra-ui/react'
import Pagination from "@choc-ui/paginator";

const Paginator = () => {
  return (
    <Flex
      w="full"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        defaultCurrent={1}
        total={50}
        paginationProps={{ display: 'flex' }}
      />
    </Flex>
  )
}

export default Paginator