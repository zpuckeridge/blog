import {
  Box,
  Flex,
  Avatar,
  Link,
  IconButton,
  Button,
  Menu,
  Spacer,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

import {
  GoPulse,
  GoHome,
  GoPencil,
  GoProject,
  GoClock,
  GoBroadcast,
} from "react-icons/go";

// import react icons

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} marginBottom="8rem">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              transition="all 0.2s"
              _focus={{ boxShadow: "outline" }}
            />
            <MenuList fontSize="lg">
              <MenuItem icon={<GoHome />}>Home</MenuItem>
              <MenuItem icon={<GoPencil />}>Blog</MenuItem>
              <MenuItem icon={<GoProject />}>Projects</MenuItem>
              <MenuItem icon={<GoClock />}>Timeline</MenuItem>
              <MenuItem icon={<GoBroadcast />}>Livestream</MenuItem>
              <MenuDivider />
              <MenuItem icon={<GoPulse />}>Status</MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Button
            variant="ghost"
            transition="all 0.2s"
            _focus={{ boxShadow: "outline" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
