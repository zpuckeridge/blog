import React from 'react'

import {
  Box,
  Badge,
  Text,
  SimpleGrid,
  Link,
  Icon,
  VStack,
  Spacer,
  Heading,
  Center,
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { StaticImage } from 'gatsby-plugin-image'

import Seo from '../components/seo'

// List of countries I have visited
const visited_countries = [
  {
    name: 'United States',
    flag: 'us',
  },
  {
    name: 'Cambodia',
    flag: 'kh',
  }
]

// Display map of world
const WorldMap = () => (
  <StaticImage
    src="world.svg"
    alt="Map of the world"
    style={{
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      border: '1px solid #ccc',
    }}
  />
)

// Highlight visited countries on the map
const WorldMapHighlight = ({ country }) => (
  <StaticImage
    src="world.svg"
    alt="Map of the world"
    style={{
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      border: '1px solid #ccc',
    }}
    preserveAspectRatio="xMidYMid slice"
    placeholderStyle={{
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      border: '1px solid #ccc',
    }}
    onLoad={() => {
      const svg = document.querySelector('svg')
      const country_path = svg.querySelector(`#${country.flag}`)
      country_path.classList.add('highlight')
    }
    }
  />
)