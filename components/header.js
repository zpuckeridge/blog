import {
  Box,
  Flex,
  Avatar,
  Link,
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

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} marginBottom="8rem">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button>
            <HamburgerIcon />
          </Button>
          <Spacer />
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
