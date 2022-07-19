import {
  FaGithub,
  FaGitlab,
  FaLinkedinIn,
  FaRegEnvelope,
  FaDev,
} from "react-icons/fa";

import {
  Box,
  Stack,
  Flex,
  HStack,
  Center,
  Heading,
  Spacer,
  Image,
  Tooltip,
  Link,
  Text,
} from "@chakra-ui/react";

import { Header } from "../components/header";

function Home() {
  return (
    <>
      <Header />
      <Center>
        <Box maxW="600px">
          <HStack>
            <Box
              boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
              borderRadius="10px"
              marginRight="10px"
            >
              <Image
                src="../public/profile-pic.jpg"
                alt="Zacchary Puckeridge"
                placeholder="blurred"
                layout="fixed"
                width={200}
                quality={100}
                height={200}
                style={{ borderRadius: `10px` }}
              />
            </Box>
            <Box>
              <Heading fontSize="5xl">Hey 👋 I'm Zacchary!</Heading>
              <Box marginTop="0.5rem">
                <Text fontSize="lg">
                  I'm an IT Administrator based out of Brisbane, Australia
                  working for{" "}
                  <Link
                    href="https://rsp.com.au"
                    title="Rising Sun Pictures Website"
                  >
                    Rising Sun Pictures
                  </Link>
                  .
                </Text>
              </Box>
              <Box marginTop="1rem" fontSize="lg">
                <HStack spacing="4">
                  <Link href="mailto:hi@zacchary.me" title="Email">
                    <Tooltip label="Email" fontSize="md">
                      <Box>
                        <FaRegEnvelope />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Link href="https://github.com/zpuckeridge" title="GitHub">
                    <Tooltip label="GitHub" fontSize="md">
                      <Box>
                        <FaGithub />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Link href="https://gitlab.com/zpuckeridge" title="GitLab">
                    <Tooltip label="GitLab" fontSize="md">
                      <Box>
                        <FaGitlab />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/zpuckeridge"
                    title="LinkedIn"
                  >
                    <Tooltip label="LinkedIn" fontSize="md">
                      <Box>
                        <FaLinkedinIn />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Link href="https://dev.to/zpuckeridge" title="DEV">
                    <Tooltip label="DEV" fontSize="md">
                      <Box>
                        <FaDev />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Spacer />
                  <Link href="/about/" title="About">
                    More about me →
                  </Link>
                </HStack>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Center>
    </>
  );
}

export default Home;
