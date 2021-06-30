import React from 'react'
import {
  Stack,
  Text,
  Box,
  Tooltip,
  Flex,
  Link,
  SimpleGrid,
} from '@chakra-ui/react'
import {
  FaGithub,
  FaHeart,
  FaGitlab,
  FaRegEnvelope,
  FaLinkedinIn,
  FaDev,
  FaMusic,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <Box
      as="footer"
      background="brand.800"
      borderTop="2px solid #292929"
    >
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gridTemplate={{ base: `1fr`, md: `1fr 1fr 1fr` }}
        mx="auto"
        maxW="7xl"
        py={4}
        px={5}
        spacing={4}
        align="center"
      >
        <Flex
          direction="row"
          maxW="full"
          mx={{ base: `auto`, md: 5 }}
          alignItems="center"
        >
          <FaMusic />
          <Text mx={3} fontWeight="800">
            Now Playing:{' '}
          </Text>
        </Flex>

        <Text>
          Made with{' '}
          <Link
            fontWeight="800"
            href="https://gatsbyjs.com/"
            title="Gatsby"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            Gatsby
          </Link>
          ,{' '}
          <Link
            fontWeight="800"
            href="https://reactjs.com/"
            title="React"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            React
          </Link>
          ,{' '}
          <Link
            fontWeight="800"
            href="https://chakra-ui.com/"
            title="Chakra UI"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            Chakra UI
          </Link>{' '}
          and{' '}
          <Link
            fontWeight="800"
            href="https://github.com/zpuckeridge/blog/"
            title="GitHub Repo"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            ❤️
          </Link>
        </Text>
        <Stack
          align="center"
          direction="row"
          spacing={4}
          ml="auto"
          mr={{ base: `auto`, md: 5 }}
        >
          <Link
            href={`mailto:hi@zacchary.me`}
            title={`Email`}
            target="_self"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            <Tooltip hasArrow label="Email" fontSize="md">
              <span>
                <FaRegEnvelope fontSize="20px" />
              </span>
            </Tooltip>
          </Link>

          <Link
            href={`https://github.com/zpuckeridge`}
            title={`GitHub`}
            target="_self"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            <Tooltip hasArrow label="GitHub" fontSize="md">
              <span>
                <FaGithub fontSize="20px" />
              </span>
            </Tooltip>
          </Link>

          <Link
            href={`https://gitlab.com/zpuckeridge`}
            title={`GitLab`}
            target="_self"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            <Tooltip hasArrow label="GitLab" fontSize="md">
              <span>
                <FaGitlab fontSize="20px" />
              </span>
            </Tooltip>
          </Link>

          <Link
            target="_self"
            title={`LinkedIn`}
            href={`https://www.linkedin.com/in/zpuckeridge`}
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            <Tooltip hasArrow label="LinkedIn" fontSize="md">
              <span>
                <FaLinkedinIn fontSize="20px" />
              </span>
            </Tooltip>
          </Link>

          <Link
            href={`https://dev.to/zpuckeridge`}
            title={`DEV`}
            target="_self"
            _hover={{ textDecor: 'none', color: '#30ce56' }}
          >
            <Tooltip hasArrow label="DEV" fontSize="md">
              <span>
                <FaDev fontSize="20px" />
              </span>
            </Tooltip>
          </Link>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}
export default Footer
