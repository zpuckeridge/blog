import React from 'react'

import {
  Box,
  Flex,
  Link,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuDivider,
  Badge,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'
import { StaticImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink } from 'gatsby'
import {
  FaBolt,
  FaRegFlag,
  FaBookmark,
  FaBookOpen,
  FaToolbox,
  FaGithub,
  FaHeadphones,
  FaDesktop,
  FaSun,
  FaMoon,
} from 'react-icons/fa'

const Header = () => (
  <Box as="header" p={4}>
    <Box>
      <Flex>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              aria-label="Navigation"
            />
            <MenuList background="brand.700">
              <MenuItem title="Tech Stack" icon={<FaBolt />}>
                Tech Stack <Badge colorScheme="yellow">WIP</Badge>
              </MenuItem>
              <MenuItem
                as={GatsbyLink}
                title="Bookmarks"
                to="/bookmarks"
                icon={<FaBookmark />}
              >
                Bookmarks <Badge colorScheme="yellow">WIP</Badge>
              </MenuItem>
              <MenuItem
                as={GatsbyLink}
                to="/countries"
                title="Countries"
                icon={<FaRegFlag />}
              >
                Countries
              </MenuItem>
              <MenuItem
                as={GatsbyLink}
                to="/projects"
                title="Projects"
                icon={<FaBookOpen />}
              >
                Projects
              </MenuItem>
              <MenuItem
                as={GatsbyLink}
                to="/uses/"
                title="Uses"
                icon={<FaToolbox />}
              >
                Uses
              </MenuItem>
              <MenuDivider />
              <MenuItem
                to="https://github.com/zpuckeridge"
                title="GitHub"
                icon={<FaGithub />}
              >
                GitHub
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Settings"
            icon={<SettingsIcon />}
          />
          <MenuList background="brand.700">
            <Badge colorScheme="yellow">WIP</Badge>
            <MenuItem icon={<FaToolbox />}>Animations On</MenuItem>
            <MenuItem icon={<FaHeadphones />}>Sounds On</MenuItem>
            <MenuDivider />
            <MenuItem icon={<FaDesktop />}>System Theme</MenuItem>
            <MenuItem icon={<FaSun />}>Light Theme</MenuItem>
            <MenuItem icon={<FaMoon />}>Dark Theme</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  </Box>
)

export default Header
