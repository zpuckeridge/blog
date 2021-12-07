import * as React from 'react'

import {
  Flex,
  Badge,
  Spacer,
  Tabs,
  TabList,
  Icon,
  TabPanels,
  Center,
  Tab,
  TabPanel,
  Box,
  Text,
  SimpleGrid,
  Heading,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Accordion,
  UnorderedList,
  ListItem,
  Link,
  Button,
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ExternalLinkIcon, DownloadIcon } from '@chakra-ui/icons'

import Seo from '../components/seo'

const AboutPage = () => {
  return (
    <>
      <Seo title="About" />
      <Box marginTop="2rem" marginBottom="4rem">
        <Heading fontSize="4xl">
          <span role="img" aria-label="waving hand">
            👋
          </span>{' '}
          About Zacchary
        </Heading>
        <Text>
          Hey there! I'm a Junior Systems Administrator based out of
          Brisbane, Australia. Currently, I'm working for an Animation
          Studio called{' '}
          <Link
            href={`https://pixelzoo.com.au`}
            isExternal
            title={`Pixel Zoo Website`}
            color="#75bcff"
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
          >
            Pixel Zoo
          </Link>
          .
        </Text>

        <Heading fontSize="2xl">
          What are you currently learning?
        </Heading>
        <Text>
          Currently, I'm learning to automate various processes at
          Pixel Zoo and build real world applications using Python,
          Django, Gatsby and React.
        </Text>
        <Text>
          When I'm not at work, or working on a personal project, I'm
          hanging out with mates, riding motorcycles, playing video
          games, nerding out over audio and teaching myself animation.
        </Text>
      </Box>
      <Box align="center">
        <Link
          href={`../static/../resume.pdf`}
          title={`Résumé`}
          _hover={{
            textDecor: 'none',
          }}
        >
          <Button size="md" marginBottom="4.5rem">
            Download my résumé{' '}
            <Icon marginLeft="0.5rem" as={DownloadIcon} />
          </Button>
        </Link>
      </Box>
      <Tabs size="md" variant="solid-rounded" colorScheme="blue">
        <Center>
          <TabList>
            <SimpleGrid
              columns={3}
              spacingX="20px"
              spacingY="20px"
              marginBottom="2rem"
            >
              <Tab>
                <Box marginRight="5px">
                  <span role="img" aria-label="toolbox">
                    🧰
                  </span>
                </Box>
                Work
              </Tab>
              <Tab>
                <Box marginRight="5px">
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </Box>
                Community
              </Tab>
              <Tab>
                <Box marginRight="5px">
                  <span role="img" aria-label="graduation">
                    🎓
                  </span>
                </Box>
                Education
              </Tab>
              <Tab>
                <Box marginRight="5px">
                  <span role="img" aria-label="brain">
                    🧠
                  </span>
                </Box>
                Skills
              </Tab>
              <Tab>
                <Box marginRight="5px">
                  <span role="img" aria-label="mouth">
                    👄
                  </span>
                </Box>
                Languages
              </Tab>
              <Tab>
                <Box marginRight="5px">
                  <span role="img" aria-label="rocket">
                    🚀
                  </span>
                </Box>
                Interests
              </Tab>
            </SimpleGrid>
          </TabList>
        </Center>

        <TabPanels>
          <TabPanel>
            <Heading marginBottom="2rem" fontSize="4xl">
              Work
            </Heading>
            <Accordion allowToggle>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Pixel Zoo
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Jun 2021 → Present
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Junior Systems Administrator</Flex>
                    <Spacer />
                    <Link
                      href={`https://pixelzoo.com.au`}
                      title={`Pixel Zoo`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                    >
                      https://pixelzoo.com.au
                    </Link>
                  </Flex>
                  <Box>
                    <Text>...</Text>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                {' '}
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Dev Demand Co.
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    May 2020 → May 2021
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Junior Cloud Architect</Flex>
                    <Spacer />
                    <Link
                      href={`https://devdemand.co`}
                      title={`Dev Demand`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                    >
                      https://devdemand.co
                    </Link>
                  </Flex>
                  <Text>
                    Learned to troubleshoot server related issues.
                    Worked in the administration of a small business
                    to develop documentation and processes. Began
                    looking into the inner workings of Kubernetes and
                    participated in the development of client related
                    projects.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Conetix Web Hosting
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Sep 2018 → May 2020
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Technical Support Staff</Flex>
                    <Spacer />
                    <Link
                      href={`https://conetix.com.au`}
                      title={`Conetix Web Hosting`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                    >
                      https://conetix.com.au
                    </Link>
                  </Flex>
                  <Text>
                    Provided professional phone and email support
                    across a wide range of various web related
                    technologies including WordPress, Office 365,
                    Plesk, Windows Server and Linux. Adept at the
                    production of writing understandable technical
                    processes and procedures.
                  </Text>
                  <Text>
                    Proficient at providing clear and consice support
                    to customers over the phone quickly and
                    efficiently. Participated in the maintenance of
                    various Windows and Linux based servers.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                {' '}
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Camp Highroad
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    May 2018 → Sep 2018{' '}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Christian Camp Counsellor</Flex>
                    <Spacer />
                    <Link
                      href={`https://camphighroad.org`}
                      title={`Camp Highroad`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                    >
                      https://camphighroad.org
                    </Link>
                  </Flex>
                  <Text>
                    Participated in leading campers through various
                    team building and extra-curricular activities.
                    Invested and developed meaningful relationships
                    with campers, parents and other counsellors.
                    Travelled from East Coast to West Coast USA and
                    made great friends along the way.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                {' '}
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Hungry Jack's
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Nov 2016 → May 2018{' '}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Crew Member</Flex>
                    <Spacer />
                    <Link
                      href={`https://hungryjacks.com.au`}
                      title={`Hungry Jack's`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                    >
                      https://hungryjacks.com.au
                    </Link>
                  </Flex>
                  <Text>
                    Picked up strong time management skills and the
                    ability to work in a stressful environment.
                    Participated in the training of Crew Members in
                    appropriate processes and procedures.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          <TabPanel>
            <Heading marginBottom="2rem" fontSize="4xl">
              Community
            </Heading>
            <Accordion allowToggle>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    GENTS Camp
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Sep 2017 → Present
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Camp Leader</Flex>
                    <Spacer />
                    <Link
                      href={`https://gentscamp.com`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                      title={`GENTS Camp`}
                    >
                      https://gentscamp.com
                    </Link>
                  </Flex>
                  <Text>
                    GENTS Camp is a Christian school holiday program
                    for boys, with a range of camps for both primary
                    and secondary students where they get to
                    particpate in activites like tubing, cable skiing,
                    wake boarding, tribal challenges and more. The
                    camp is designed to show young guys what becoming
                    a Christian man is really about.
                  </Text>
                  <Text>
                    The camp is a great chance to share the gospel
                    with those that may not have heard it. I've been
                    going to GENTS Camp as a leader since 2017 and
                    love helping out!
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Faith Bound
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Oct 2017 → Present
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Owner</Flex>
                    <Spacer />
                    <Link
                      href={`https://faithbound.gg`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                      title={`Faith Bound`}
                    >
                      https://faithbound.gg
                    </Link>
                  </Flex>
                  A few friends and I founded Faith Bound as a
                  Christian Community Discord cantered around
                  fellowship and sharing the truth of the Gospel. We
                  are a community primarily based in Australia who
                  seek to grow together as brothers and sisters in
                  Christ while sharing the good news found in the
                  Bible - God's abounding love for us displayed
                  perfectly in the death of Jesus Christ.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Chaplain Watch
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Nov 2020 → Jun 2021
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Night Watch</Flex>
                    <Spacer />
                    <Link
                      href={`https://chaplainwatch.org.au/`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                      title={`Chaplain Watch`}
                    >
                      https://chaplainwatch.org.au/
                    </Link>
                  </Flex>
                  <Text>
                    Chaplain Watch is a Christian community service
                    charity, designed to intentionally intervene where
                    people are in crisis, at risk, and in need. Once a
                    month, I volunteer my time to apply First Aid and
                    support public safety in Brisbane's night
                    precinct.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Minden Baptist Church
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Feb 2020 → Oct 2020
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Sound Technician</Flex>
                    <Spacer />
                    <Link
                      href={`https://mindenbaptist.org`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                      title={`Minden Baptist Church`}
                    >
                      https://mindenbaptist.org
                    </Link>
                  </Flex>
                  <Text>
                    I volunteered my time as a Sound Technician at
                    Minden Baptist Church to setting up, mixing, and
                    packing down equipment before, during and after
                    Church Services. Additionally, I operated cameras,
                    livestreams and performed maintenance on these
                    systems while I attended. I also revamped the
                    churches website, although not perfect - is
                    certainly much better than before!
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Kingsridge Baptist Church
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Sep 2017 → May 2018
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>Sound Technician / Youth Leader</Flex>
                    <Spacer />
                    <Link
                      href={`https://kingsridgebaptist.org`}
                      color="#75bcff"
                      _hover={{
                        textDecor: 'none',
                        color: '#30ce56',
                      }}
                      title={`Kingsridge Baptist Church`}
                    >
                      https://kingsridgebaptist.org
                    </Link>
                  </Flex>
                  <Text>
                    At Kingsridge Baptist Church, I volunteered my
                    time as a Youth Leader and Sound Technician. These
                    responsibilities also included recording, live
                    streaming and editing videos for the church.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          <TabPanel>
            <Heading marginBottom="2rem" fontSize="4xl">
              Education
            </Heading>

            <Accordion allowToggle>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    TAFE
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Jan 2019 → Jan 2020
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>
                      <Text>
                        Information Technologies & Digital Media
                      </Text>
                    </Flex>
                    <Spacer />
                    <Text>Certificate III</Text>
                  </Flex>
                  <Text>
                    General all rounder course on building computers,
                    troubleshooting technology like printers, routers
                    and networks completed while working at Conetix.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Plesk University
                  </Box>{' '}
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="right"
                    fontSize="lg"
                  >
                    Jan 2020 → Jun 2020
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex marginBottom="1rem">
                    <Flex>
                      <Text>Plesk Professional Certification</Text>
                    </Flex>
                    <Spacer />
                    <Text>Valid until 2021</Text>
                  </Flex>
                  <Text>
                    Level 1 Web Hosting and Support Certification
                    working with the Plesk Control Panel.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          <TabPanel>
            <Heading marginBottom="2rem" fontSize="4xl">
              Skills
            </Heading>
            <Accordion allowToggle>
              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Systems Administration
                  </Box>{' '}
                  <Badge fontSize="xs" colorScheme="yellow">
                    Junior
                  </Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex>
                    <Flex>
                      <UnorderedList>
                        <ListItem>Debian/CentOS</ListItem>
                        <ListItem>Windows</ListItem>
                        <ListItem>Powershell</ListItem>
                        <ListItem>Docker</ListItem>
                        <ListItem>DNS/Domain Management</ListItem>
                        <ListItem>Proxmox</ListItem>
                        <ListItem>CephFS</ListItem>
                        <ListItem>
                          Django
                          <Badge
                            ml="2"
                            fontSize="xs"
                            colorScheme="green"
                          >
                            Learning
                          </Badge>
                        </ListItem>
                        <ListItem>
                          Networking
                          <Badge
                            ml="2"
                            fontSize="xs"
                            colorScheme="green"
                          >
                            Learning
                          </Badge>
                        </ListItem>
                        <ListItem>
                          AD Management{' '}
                          <Badge
                            ml="2"
                            fontSize="xs"
                            colorScheme="green"
                          >
                            Learning
                          </Badge>
                        </ListItem>
                      </UnorderedList>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Programming
                  </Box>{' '}
                  <Badge fontSize="xs" colorScheme="yellow">
                    Junior
                  </Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex>
                    <UnorderedList>
                      <ListItem>HTML</ListItem>
                      <ListItem>CSS</ListItem>
                      <ListItem>GatsbyJS</ListItem>
                      <ListItem>Chakra-UI</ListItem>
                      <ListItem>
                        React{' '}
                        <Badge
                          ml="2"
                          fontSize="xs"
                          colorScheme="green"
                        >
                          Learning
                        </Badge>
                      </ListItem>
                      <ListItem>
                        Python{' '}
                        <Badge
                          ml="2"
                          fontSize="xs"
                          colorScheme="green"
                        >
                          Learning
                        </Badge>
                      </ListItem>
                      <ListItem>
                        Git CI/CD{' '}
                        <Badge
                          ml="2"
                          fontSize="xs"
                          colorScheme="green"
                        >
                          Learning
                        </Badge>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Technical Support
                  </Box>{' '}
                  <Badge fontSize="xs" colorScheme="green">
                    Middle
                  </Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex>
                    <UnorderedList>
                      <ListItem>ZenDesk</ListItem>
                      <ListItem>Freshdesk</ListItem>
                      <ListItem>3CX</ListItem>
                      <ListItem>GSuite</ListItem>
                      <ListItem>Office 365</ListItem>
                      <ListItem>Email Troubleshooting</ListItem>
                      <ListItem>
                        Building and Repairing Computers/Laptops
                      </ListItem>
                      <ListItem>Troubleshooting Logs</ListItem>
                    </UnorderedList>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                marginBottom="1rem"
                border="1px solid white"
                borderRadius="20px"
                backgroundColor="#212121"
              >
                <AccordionButton
                  borderBottom="1px solid white"
                  borderRadius="20px"
                >
                  <Box
                    fontWeight="800"
                    flex="1"
                    align="left"
                    fontSize="lg"
                  >
                    Other
                  </Box>{' '}
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex>
                    <UnorderedList>
                      <ListItem>EQ (Audio Equalisation)</ListItem>
                      <ListItem>
                        OBS (Open Broadcaster Software)
                      </ListItem>
                      <ListItem>Stage Setup + Tear Down</ListItem>
                    </UnorderedList>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          <TabPanel>
            <Heading marginBottom="2rem" fontSize="4xl">
              Languages
            </Heading>
            <Flex marginBottom="1rem">
              <Heading fontSize="lg">Language</Heading> <Spacer />
              <Heading fontSize="lg">Fluency</Heading>
            </Flex>
            <Flex marginBottom="-20px">
              <Text>English</Text>
              <Spacer />
              <Text>Native</Text>
            </Flex>
            <Flex marginBottom="-20px">
              <Text>Russian </Text>
              <Spacer />
              <Text>
                5%{' '}
                <Badge ml="2" fontSize="xs" colorScheme="green">
                  Learning
                </Badge>
              </Text>
            </Flex>
            <Flex>
              <Text>普通話 (Mandarin) </Text>
              <Spacer />
              <Text>
                0%{' '}
                <Badge ml="2" fontSize="xs" colorScheme="yellow">
                  Not Started
                </Badge>
              </Text>
            </Flex>
          </TabPanel>

          <TabPanel>
            <Heading marginBottom="2rem" fontSize="4xl">
              Interests
            </Heading>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Heading marginBottom="1rem" fontSize="lg">
                  Photography
                </Heading>
                <UnorderedList>
                  <ListItem>Camera</ListItem>
                  <ListItem>Lighting</ListItem>
                  <ListItem>Exploration</ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Heading marginBottom="1rem" fontSize="lg">
                  Audiophile
                </Heading>
                <UnorderedList>
                  <ListItem>Vinyl</ListItem>
                  <ListItem>Tube Amps</ListItem>
                  <ListItem>Headphones</ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Heading marginBottom="1rem" fontSize="lg">
                  Self-Hosting
                </Heading>
                <UnorderedList>
                  <ListItem>Home Lab</ListItem>
                  <ListItem>Docker</ListItem>
                  <ListItem>Kubernetes</ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Heading marginBottom="1rem" fontSize="lg">
                  Gaming
                </Heading>
                <UnorderedList>
                  <ListItem>
                    <Link
                      href="https://github.com/zpuckeridge/csgo-config"
                      title={`CSGO Config`}
                    >
                      CSGO <ExternalLinkIcon />
                    </Link>
                  </ListItem>
                  <ListItem>Minecraft</ListItem>
                  <ListItem>Overwatch</ListItem>
                </UnorderedList>
              </Box>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box marginTop="2rem" marginBottom="2rem">
        <Heading fontSize="4xl">Contact</Heading>
        <Flex>
          <Text direction="row">
            Feel free to shoot me an email over at:
          </Text>
          <Spacer />
          <Text fontWeight="800">
            <Link
              align="center"
              href="mailto:hi@zacchary.me"
              color="#75bcff"
              _hover={{
                textDecor: 'none',
                color: '#30ce56',
              }}
            >
              hi@zacchary.me
            </Link>{' '}
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
