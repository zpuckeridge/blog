import * as React from 'react'

import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FaGithub, FaGitlab, FaLinkedin, FaDev } from 'react-icons/fa'
import {
  Box,
  Stack,
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
        <Flex align="center" minH="80vh">
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
            <Box maxW="800px">
              <Heading fontSize="5xl">Hi, I'm Zacchary!</Heading>
              <Box marginTop="0.5rem">
                <Text
                  maxW="400px"
                  color="rgba(255, 255, 255, 0.9);"
                  fontSize="lg"
                >
                  I'm a self-taught{' '}
                  <Link
                    as={GatsbyLink}
                    to={`/about/`}
                    title={`About`}
                    color="#75bcff"
                    _hover={{
                      textDecor: 'none',
                      color: '#30ce56',
                    }}
                  >
                    Web Developer
                  </Link>{' '}
                  based out of Brisbane, Australia working for Pixel
                  Zoo.
                  <Box marginTop="1rem">
                    <Stack align="center" direction="row" spacing={4}>
                      <Link
                        href={`https://github.com/zpuckeridge`}
                        target="_self"
                        title={`GitHub`}
                        _hover={{
                          textDecor: 'none',
                          color: '#30ce56',
                        }}
                      >
                        <Tooltip
                          hasArrow
                          label="GitHub"
                          fontSize="md"
                        >
                          <span>
                            <FaGithub fontSize="20px" />
                          </span>
                        </Tooltip>
                      </Link>

                      <Link
                        href={`https://gitlab.com/zpuckeridge`}
                        target="_self"
                        title={`GitLab`}
                        _hover={{
                          textDecor: 'none',
                          color: '#30ce56',
                        }}
                      >
                        <Tooltip
                          hasArrow
                          label="GitLab"
                          fontSize="md"
                        >
                          <span>
                            <FaGitlab fontSize="20px" />
                          </span>
                        </Tooltip>
                      </Link>

                      <Link
                        target="_self"
                        title={`LinkedIn`}
                        href={`https://www.linkedin.com/in/zpuckeridge`}
                        _hover={{
                          textDecor: 'none',
                          color: '#30ce56',
                        }}
                      >
                        <Tooltip
                          hasArrow
                          label="LinkedIn"
                          fontSize="md"
                        >
                          <span>
                            <FaLinkedin fontSize="20px" />
                          </span>
                        </Tooltip>
                      </Link>

                      <Link
                        href={`https://dev.to/zpuckeridge`}
                        target="_self"
                        title={`DEV`}
                        _hover={{
                          textDecor: 'none',
                          color: '#30ce56',
                        }}
                      >
                        <Tooltip hasArrow label="DEV" fontSize="md">
                          <span>
                            <FaDev fontSize="20px" />
                          </span>
                        </Tooltip>
                      </Link>
                      <Spacer />
                      <Link
                        as={GatsbyLink}
                        to={`/about/`}
                        title={`About`}
                        color="#75bcff"
                        _hover={{
                          textDecor: 'none',
                          color: '#30ce56',
                        }}
                      >
                        More about me →
                      </Link>
                    </Stack>
                  </Box>
                </Text>
              </Box>
            </Box>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}

export default IndexPage
