import React from 'react'

import {
  Box,
  Flex,
  Link,
  Spacer,
  Menu,
  MenuButton,
  Badge,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { StaticImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink } from 'gatsby'
import {
  FaBolt,
  FaRegFlag,
  FaBookmark,
  FaBookOpen,
  FaToolbox,
} from 'react-icons/fa'

const Header = () => (
  <Box as="header" p={4}>
    <Box maxW="42rem" mx="auto">
      <Flex>
        <Link as={GatsbyLink} to="/" title="Home">
          <StaticImage
            quality={100}
            src="../../src/images/profile-pic.jpg"
            alt="Zacchary Puckeridge"
            placeholder="blurred"
            width={40}
            height={40}
            style={{ borderRadius: `100%` }}
          />
        </Link>
        <Spacer />
        <Box>
          <Menu>
            <Button
              variant="ghost"
              as={GatsbyLink}
              to="/articles/"
              title="Articles"
              color="white"
              marginRight="1rem"
            >
              Articles
            </Button>
            <Button
              variant="ghost"
              as={GatsbyLink}
              to="/about/"
              title="About"
              color="white"
              marginRight="1rem"
            >
              About
            </Button>
            <MenuButton
              patternOpacity={1}
              rightIcon={<ChevronDownIcon />}
              as={Button}
            >
              Links
            </MenuButton>
            <MenuList background="brand.700">
              <MenuItem
                title="Tech Stack"
                color="white"
                icon={<FaBolt />}
              >
                Tech Stack <Badge colorScheme="yellow">WIP</Badge>
              </MenuItem>
              <MenuItem
                title="Bookmarks"
                color="white"
                icon={<FaBookmark />}
              >
                Bookmarks <Badge colorScheme="yellow">WIP</Badge>
              </MenuItem>
              <MenuItem
                as={GatsbyLink}
                to="/projects"
                title="Projects"
                color="white"
                icon={<FaBookOpen />}
              >
                Projects
              </MenuItem>
              <MenuItem
                title="Countries"
                color="white"
                icon={<FaRegFlag />}
              >
                Countries <Badge colorScheme="yellow">WIP</Badge>
              </MenuItem>
              <MenuItem
                as={GatsbyLink}
                to="/uses/"
                title="Uses"
                color="white"
                icon={<FaToolbox />}
              >
                Uses <Badge colorScheme="yellow">WIP</Badge>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  </Box>
)

export default Header
