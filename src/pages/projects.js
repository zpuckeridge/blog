import * as React from 'react'

import { chakra, Box, Link } from '@chakra-ui/react'

import Seo from '../components/seo'

const Projects = () => {
  return (
    <>
      <Seo title="Projects" />
      <Box
        display="flex"
        shadow="lg"
        rounded="20px"
        h="250px"
        w="full"
      >
        <Box w={{ lg: '50%' }}>
          <Box
            rounded={{ lg: 'lg' }}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
            }}
          ></Box>
        </Box>

        <Box py={12} px={6} w={{ lg: '50%' }}>
          <chakra.h2
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
          >
            Build Your New <chakra.span>Idea</chakra.span>
          </chakra.h2>
          <chakra.p mt={4}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quidem modi reprehenderit vitae exercitationem aliquid
            dolores ullam temporibus enim expedita aperiam mollitia
            iure consectetur dicta tenetur, porro consequuntur saepe
            accusantium consequatur.
          </chakra.p>

          <Box mt={8}>
            <Link px={5} py={3} fontWeight="semibold" rounded="lg">
              Start Now
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Projects
