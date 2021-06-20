import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

export default function ThemeToggle() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const ToggleIcon = useColorModeValue(SunIcon, MoonIcon)

  return (
    <Tooltip hasArrow label="Toggle Theme" fontSize="md">
      <IconButton
        icon={<ToggleIcon />}
        variant="ghost"
        aria-label="Toggle Theme"
        onClick={toggleMode}
      />
    </Tooltip>
  )
}
