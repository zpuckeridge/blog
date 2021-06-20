import React from 'react'

import {
  Flex,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
} from '@chakra-ui/react'

import Seo from '../components/seo'

const TechStack = () => (
  <>
    <Seo title="Tech Stack" />
    <Flex
      direction="column"
      alignItems="center"
      width="full"
      minH="100vh"
      mx="auto"
      maxW="6xl"
    >
      <Heading
        borderBottom="2px solid #292929"
        fontSize="4xl"
        textAlign="center"
      >
        Tech Stack
      </Heading>
      <Text mt={2} fontSize="xl">
        A list of the technologies that I use on a daily basis.
      </Text>
      <Tabs mt={12} variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab mr={4}>Web Development</Tab>
          <Tab mr={4}>Programming</Tab>
          <Tab mr={4}>Devops</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>web development</p>
          </TabPanel>
          <TabPanel>
            <p>programming</p>
          </TabPanel>
          <TabPanel>
            <p>devops</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  </>
)

export default TechStack
