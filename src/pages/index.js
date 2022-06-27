import * as React from 'react'

import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import {
  FaGithub,
  FaGitlab,
  FaLinkedinIn,
  FaRegEnvelope,
  FaDev,
} from 'react-icons/fa'
import {
  Box,
  Stack,
  Button,
  Flex,
  Center,
  Heading,
  Spacer,
  Tooltip,
  Link,
  Text,
} from '@chakra-ui/react'

import Seo from '../components/seo'

const IndexPage = () => {
  return (
    <>
      <Seo title="Home" />
      <Center>
        <Flex align="center" minH="82.5vh">
          <Stack direction={['column', 'row']}>
            <Center>
              <Box
                boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
                borderRadius="10px"
                marginRight="10px"
              >
                <StaticImage
                  src="../../src/images/profile-pic.jpg"
                  alt="Zacchary Puckeridge"
                  placeholder="blurred"
                  layout="fixed"
                  width={200}
                  quality={100}
                  height={200}
                  style={{ borderRadius: `10px` }}
                />
              </Box>
            </Center>
            <Center>
              <Box maxW="800px">
                <Heading fontSize="6xl">
                  Howdy 👋 I'm Zacchary!
                </Heading>
                <Box marginTop="0.5rem">
                  <Text
                    maxW="400px"
                    color="rgba(255, 255, 255, 0.9);"
                    fontSize="xl"
                  >
                    I am a 22 year old IT Administrator and Web
                    Developer working for{' '}
                    <Link
                      href={`https://rsp.com.au`}
                      isExternal
                      title={`Rising Sun Pictures Website`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                    >
                      Rising Sun Pictures
                    </Link>
                    .
                    <Box marginTop="1rem">
                      <Stack
                        align="center"
                        direction="row"
                        spacing={4}
                      >
                        <Button
                          as={GatsbyLink}
                          to="/articles/"
                          title="Articles"
                          color="white"
                        >
                          Articles
                        </Button>
                        <Button
                          as={GatsbyLink}
                          to="/about/"
                          title="About"
                          color="white"
                        >
                          About
                        </Button>
                        <Button
                          as={GatsbyLink}
                          to="/projects/"
                          title="Projects"
                          color="white"
                        >
                          Projects
                        </Button>
                      </Stack>
                    </Box>
                  </Text>
                </Box>
              </Box>
            </Center>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}

export default IndexPage
