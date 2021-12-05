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

export default function Projects() {
  return (
    <>
      <Seo title="Projects" />
      <Box>
        <VStack spacing={8}>
          <VStack>
            <Heading fontSize="4xl">
              <span role="img" aria-label="Projects">
                📖
              </span>{' '}
              Projects
            </Heading>
            <Text fontSize="2xl" color="white" textAlign="center">
              Check out some of the things I've worked on!
            </Text>
          </VStack>
        </VStack>
      </Box>
      <Box marginTop="50px">
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2 }}
          flexDirection="column-reverse"
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 10 }}
        >
          <Box order={{ base: 'none', md: 2 }}>
            <Link
              href={`https://savvyelectricalanddata.com.au`}
              mb={4}
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="extrabold"
              color="#ffffff"
              letterSpacing="tight"
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ md: 'shorter' }}
              _hover={{
                color: '#30ce56',
                textDecor: 'none',
              }}
            >
              Savvy Electrical and Data
              <Icon
                marginLeft="0.5rem"
                w={6}
                h={6}
                as={ExternalLinkIcon}
              />
            </Link>
            <Spacer />
            <Badge colorScheme="blue">Web Development</Badge>
            <Text
              mb={5}
              textAlign={{ base: 'center', sm: 'left' }}
              fontSize={{ md: 'md' }}
              color="#c3c8d3"
            >
              Savvy Electrical and Data needed a simple site to get
              their business up and running on the web.
            </Text>
          </Box>
          <Center>
            <Box
              boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
              borderRadius="10px"
              width={300}
            >
              <StaticImage
                src="../../src/images/website-preview-savvy.png"
                alt="Zacchary Puckeridge"
                placeholder="blurred"
                width={300}
                height={225}
                quality={100}
                style={{ borderRadius: `10px` }}
              />
            </Box>
          </Center>
        </SimpleGrid>
        <SimpleGrid
          alignItems="start"
          columns={{ base: 1, md: 2 }}
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 10 }}
        >
          <Box>
            <Link
              as={GatsbyLink}
              to={`/`}
              mb={4}
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ md: 'shorter' }}
              _hover={{
                color: '#30ce56',
                textDecor: 'none',
              }}
            >
              This Website
              <Icon
                marginLeft="0.5rem"
                w={6}
                h={6}
                as={ExternalLinkIcon}
              />
            </Link>
            <Spacer />
            <Badge colorScheme="blue">Web Development</Badge>
            <Text
              mb={5}
              textAlign={{ base: 'center', sm: 'left' }}
              fontSize={{ md: 'md' }}
              color="#c3c8d3"
            >
              A place to keep a record of what I'm up to in life, to
              show off cool projects and learn new things.
            </Text>
          </Box>
          <Center>
            <Box
              boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
              borderRadius="10px"
              width={300}
            >
              <StaticImage
                src="../../src/images/website-preview-zacchary.jpg"
                alt="Zacchary Puckeridge"
                placeholder="blurred"
                width={300}
                height={225}
                quality={100}
                style={{ borderRadius: `10px` }}
              />
            </Box>
          </Center>
        </SimpleGrid>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2 }}
          flexDirection="column-reverse"
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 10 }}
        >
          <Box order={{ base: 'none', md: 2 }}>
            <Link
              href={`https://mindenbaptist.org`}
              mb={4}
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ md: 'shorter' }}
              _hover={{
                color: '#30ce56',
                textDecor: 'none',
              }}
            >
              Minden Baptist Church
              <Icon
                marginLeft="0.5rem"
                w={6}
                h={6}
                as={ExternalLinkIcon}
              />
            </Link>
            <Spacer />
            <Badge colorScheme="blue">Web Development</Badge>
            <Text
              mb={5}
              textAlign={{ base: 'center', sm: 'left' }}
              fontSize={{ md: 'md' }}
              color="#c3c8d3"
            >
              I helped Minden Baptist Church refresh their website
              with Gatsby which has significantly improved it's speed
              and functionality.
            </Text>
          </Box>
          <Center>
            <Box
              boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
              borderRadius="10px"
              width={300}
            >
              <StaticImage
                src="../../src/images/website-preview-minden.jpg"
                alt="Zacchary Puckeridge"
                placeholder="blurred"
                width={300}
                height={225}
                quality={100}
                style={{ borderRadius: `10px` }}
              />
            </Box>
          </Center>
        </SimpleGrid>
        <SimpleGrid
          alignItems="start"
          columns={{ base: 1, md: 2 }}
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 10 }}
        >
          <Box>
            <Link
              href={`https://faithbound.gg`}
              mb={4}
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ md: 'shorter' }}
              _hover={{
                color: '#30ce56',
                textDecor: 'none',
              }}
            >
              Faith Bound
              <Icon
                marginLeft="0.5rem"
                w={6}
                h={6}
                as={ExternalLinkIcon}
              />
            </Link>
            <Spacer />
            <Badge colorScheme="blue">FOUNDER</Badge>
            <Text
              mb={5}
              textAlign={{ base: 'center', sm: 'left' }}
              fontSize={{ md: 'md' }}
              color="#c3c8d3"
            >
              Faith Bound is a Christian Community Discord cantered
              around fellowship and sharing the truth of the Gospel
              which I've been running for a few years now.
            </Text>
          </Box>
          <Center>
            <Box
              boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
              borderRadius="10px"
              width={300}
            >
              <StaticImage
                src="../../src/images/website-preview-faithbound.jpg"
                alt="Zacchary Puckeridge"
                placeholder="blurred"
                width={300}
                height={225}
                quality={100}
                style={{ borderRadius: `10px` }}
              />
            </Box>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  )
}
