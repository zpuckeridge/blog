import * as React from 'react'

import {
  Text,
  Heading,
  List,
  Box,
  VStack,
  ListIcon,
  ListItem,
  Link,
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import Seo from '../components/seo'

const UsesPage = () => {
  return (
    <>
      <Seo title="Uses" />
      <Box marginBottom="2rem">
        <VStack spacing={8}>
          <VStack>
            <Heading fontSize="4xl">
              <span role="img" aria-label="Tools">
                🛠️
              </span>{' '}
              Uses
            </Heading>
            <Text fontSize="2xl" color="white" textAlign="center">
              A list of the tools that I use on a regular basis.
            </Text>
          </VStack>
        </VStack>
      </Box>
      <Heading fontSize="2xl">Hardware</Heading>
      <Text>
        I am currently dual booting{' '}
        <Link
          color="#75bcff"
          href={`https://pop.system76.com/`}
          title={`Pop!_OS`}
          _hover={{
            textDecor: 'none',
            color: '#30ce56',
          }}
        >
          POP!_OS
        </Link>{' '}
        and{' '}
        <Link
          color="#75bcff"
          _hover={{
            textDecor: 'none',
            color: '#30ce56',
          }}
          href={`https://www.microsoft.com/en-au/software-download/windows10`}
          title={`Windows 10`}
        >
          Windows 11.
        </Link>
      </Text>
      <Text>My rig has the following specifications:</Text>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          CPU: Ryzen 7 5800X
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          GPU: AMD RX 6600XT
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          RAM: Corsair 2 x 32GB DDR4-3200MHz
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          MBO: ASUS ROG STRIX X570-I
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          SSD: 2x 1TB Samsung 980 Pro
        </ListItem>
      </List>
      <Text>For audio, I&#39;m using the following:</Text>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Amplification: Focusrite Scarlett Solo
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Microphone: Audio-Technica AT2020 Cardioid Condenser
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Headphones: Beyerdynamic DT 770 + Koss KPH30i + Audio-Technica ATH-AD700X
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        Gadgets
      </Heading>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Phone - Google Pixel 6 (GrapheneOS)
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Camera - Nikon D3200
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        Editor &amp; Terminal
      </Heading>
      <Text>Visual Studio Code is my primary editor.</Text>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />I use the{' '}
          <Link
            color="#75bcff"
            href={`https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme/`}
            title={`Visual Studio Code Marketplace`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
          >
            GitHub
          </Link>{' '}
          Theme
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Shell:{' '}
          <Link
            color="#75bcff"
            href={`https://www.zsh.org/`}
            title={`ZSH`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
          >
            Zsh
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Shell Theme: powerlevel10k
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        Tools
      </Heading>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          My primary Web Browsers are{' '}
          <Link
            color="#75bcff"
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            href={`https://librewolf-community.gitlab.io/`}
            title={`Librewolf`}
          >
            LibreWolf
          </Link>{' '}
          and{' '}
          <Link
            color="#75bcff"
            href={`https://brave.com/`}
            title={`Brave`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
          >
            Brave
          </Link>
          . These are both great privacy respecting choices that allow
          me to develop for both platforms.
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Password Manager:{' '}
          <Link
            href={`https://bitwarden.com/`}
            title={`Bitwarden`}
            color="#75bcff"
          >
            Bitwarden
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Tech Stack Detection:{' '}
          <Link
            href={`https://www.wappalyzer.com/`}
            title={`Wappalyzer`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Wappalyzer
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Communication:{' '}
          <Link
            href={`https://slack.com/intl/en-au/`}
            title={`Slack`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Slack
          </Link>{' '}
          and{' '}
          <Link
            href={`https://discord.com/brand-new`}
            title={`Discord`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Discord
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Ad Blocking:{' '}
          <Link
            href={`https://pi-hole.net/`}
            title={`Pi-Hole`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            AdGuard
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Two Factor Authentication:{' '}
          <Link
            href={`https://getaegis.app/`}
            title={`Aegis Authenticator`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Aegis Authenticator
          </Link>
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        CLI Tools
      </Heading>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          <Link
            href={`https://ohmyz.sh/`}
            title={`Oh My Zsh`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Oh My Zsh
          </Link>
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        Self Hosted Tools
      </Heading>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Virtualisation:{' '}
          <Link
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
            href={`https://www.proxmox.com/en/`}
            title={`Proxmox`}
          >
            Proxmox
          </Link>
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        DevOps Tech Stack (Currently Learning)
      </Heading>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Programming Language:{' '}
          <Link
            href={`https://www.python.org/`}
            title={`Python`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Python
          </Link>{' '}
          +{' '}
          <Link
            href={`https://www.javascript.com/`}
            title={`JavaScript`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            JavaScript
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Monitoring &amp; Logging:{' '}
          <Link
            href={`https://prometheus.io/`}
            title={`Prometheus`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Prometheus
          </Link>{' '}
          +{' '}
          <Link
            href={`https://www.elastic.co/kibana`}
            title={`Kibana`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Kibana
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Containerisation:{' '}
          <Link
            href={`https://kubernetes.io/`}
            title={`Kubernetes`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Kubernetes
          </Link>{' '}
          +{' '}
          <Link
            href={`https://www.docker.com/`}
            title={`Docker`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Docker
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Virtualisation:{' '}
          <Link
            href={`https://www.vmware.com/`}
            title={`VMware`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            VMware
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Cloud Computation:{' '}
          <Link
            href={`https://cloud.linode.com/`}
            title={`Linode`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Linode
          </Link>{' '}
          +{' '}
          <Link
            href={`https://aws.amazon.com/`}
            title={`AWS`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            AWS
          </Link>{' '}
          +{' '}
          <Link
            href={`https://cloud.google.com/`}
            title={`Google Cloud`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Google Cloud
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Security:{' '}
          <Link
            href={`https://www.vaultproject.io/`}
            title={`Vault`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Vault
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Provisioning:{' '}
          <Link
            href={`https://www.terraform.io/`}
            title={`Terraform`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Terraform
          </Link>{' '}
          and{' '}
          <Link
            href={`https://www.ansible.com/`}
            title={`Ansible`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Ansible
          </Link>
        </ListItem>
      </List>
      <Heading
        fontSize="2xl"
        marginTop="12.5px"
        marginBottom="12.5px"
      >
        Development Services
      </Heading>
      <List>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Code Repositories:{' '}
          <Link
            href={`https://github.com/`}
            title={`GitHub`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            GitHub
          </Link>{' '}
          &amp;{' '}
          <Link
            href={`https://about.gitlab.com/`}
            title={`GitLab`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            GitLab
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Domain Name Provider:{' '}
          <Link
            href={`https://www.namecheap.com/`}
            title={`Namecheap`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Namecheap
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={ArrowForwardIcon} />
          Server Host:{' '}
          <Link
            href={`https://cloud.linode.com/`}
            title={`Linode`}
            _hover={{
              textDecor: 'none',
              color: '#30ce56',
            }}
            color="#75bcff"
          >
            Linode
          </Link>
        </ListItem>
      </List>
    </>
  )
}

export default UsesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
