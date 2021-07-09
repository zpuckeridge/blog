import React from 'react'
import {
  Stack,
  Text,
  Box,
  Center,
  Tooltip,
  Link,
} from '@chakra-ui/react'
import {
  FaGithub,
  FaGitlab,
  FaRegEnvelope,
  FaLinkedinIn,
  FaDev,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <Box as="footer" align="center">
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
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </Link>
      </Text>
      <Center>
        <Stack direction="row" spacing={4} marginBottom="2vh">
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
      </Center>
    </Box>
  )
}
export default Footer
