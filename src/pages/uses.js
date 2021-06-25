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

import Seo from '../components/seo'

const UsesPage = () => {
  return (
    <>
      <Seo title="Uses" />
      <Text>
        A compiled list of the tools, tech stack, programs and
        hardware I use on a daily basis.
      </Text>
      <Heading id="operating-system-hardware">
        Operating System &amp; Hardware
      </Heading>
      <Text>
        I am currently dual booting{' '}
        <Link href={`https://pop.system76.com/`} title={`Pop!_OS`}>
          POP!_OS
        </Link>{' '}
        and{' '}
        <Link
          href={`https://www.microsoft.com/en-au/software-download/windows10`}
          title={`Windows 10`}
        >
          Windows 10.
        </Link>
      </Text>
      <Text>My rig has the following specifications:</Text>
      <UnorderedList>
        <ListItem>CPU: Ryzen 2700X</ListItem>
        <ListItem>GPU: NVIDIA GTX 1080</ListItem>
        <ListItem>RAM: Corsair 4 x 8GB 3200MHz</ListItem>
        <ListItem>MBO: ASRock Taichi X370</ListItem>
        <ListItem>PSU: Corsair Gold 650W</ListItem>
        <ListItem>HDD: Western Digital 2TB</ListItem>
        <ListItem>SSD: Western Digital 480GB M.2</ListItem>
      </UnorderedList>
      <Text>For audio, I&#39;m using the following:</Text>
      <UnorderedList>
        <ListItem>Amplification: Focusrite Scarlett Solo</ListItem>
        <ListItem>Microphone: AT2020</ListItem>
        <ListItem>
          Headphones: Beyerdynamic DT 770 + Koss KPH30i + Shure SRH440
        </ListItem>
      </UnorderedList>
      <Heading id="gadgets">Gadgets</Heading>
      <UnorderedList>
        <ListItem>Phone - Samsung Galaxy S20 Ultra 5G</ListItem>
        <ListItem>Camera - Nikon D3200</ListItem>
      </UnorderedList>
      <Heading id="editor-terminal">Editor &amp; Terminal</Heading>
      <Text>Visual Studio Code is my primary editor.</Text>
      <UnorderedList>
        <ListItem>
          I use the{' '}
          <Link
            href={`https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme/`}
            title={`Visual Studio Code Marketplace`}
          >
            GitHub
          </Link>{' '}
          Theme
        </ListItem>
        <ListItem>
          Shell:{' '}
          <Link href={`https://www.zsh.org/`} title={`ZSH`}>
            Zsh
          </Link>
        </ListItem>
        <ListItem>Shell Theme: powerlevel10k</ListItem>
      </UnorderedList>
      <Heading id="tools">Tools</Heading>
      <UnorderedList>
        <ListItem>
          My primary Web Browsers are{' '}
          <Link
            href={`https://librewolf-community.gitlab.io/`}
            title={`Librewolf`}
          >
            LibreWolf
          </Link>{' '}
          and{' '}
          <Link href={`https://brave.com/`} title={`Brave`}>
            Brave
          </Link>
          . These are both great privacy respecting choices that allow
          me to develop for both platforms.
        </ListItem>
        <ListItem>
          Password Manager:{' '}
          <Link href={`https://bitwarden.com/`} title={`Bitwarden`}>
            Bitwarden
          </Link>
        </ListItem>
        <ListItem>
          Tech Stack Detection:{' '}
          <Link
            href={`https://www.wappalyzer.com/`}
            title={`Wappalyzer`}
          >
            Wappalyzer
          </Link>
        </ListItem>
        <ListItem>
          Communication:{' '}
          <Link
            href={`https://slack.com/intl/en-au/`}
            title={`Slack`}
          >
            Slack
          </Link>{' '}
          and{' '}
          <Link
            href={`https://discord.com/brand-new`}
            title={`Discord`}
          >
            Discord
          </Link>
        </ListItem>
        <ListItem>
          Ad Blocking:{' '}
          <Link href={`https://pi-hole.net/`} title={`Pi-Hole`}>
            AdGuard
          </Link>
        </ListItem>
        <ListItem>
          Two Factor Authentication:{' '}
          <Link
            href={`https://getaegis.app/`}
            title={`Aegis Authenticator`}
          >
            Aegis Authenticator
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading id="cli-tools">CLI Tools</Heading>
      <UnorderedList>
        <ListItem>
          <Link href={`https://ohmyz.sh/`} title={`Oh My Zsh`}>
            Oh My Zsh
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading id="self-hosted-tools">Self Hosted Tools</Heading>
      <UnorderedList>
        <ListItem>
          Virtualisation:{' '}
          <Link
            href={`https://www.proxmox.com/en/`}
            title={`Proxmox`}
          >
            Proxmox
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading id="preferred-tech-stack">
        DevOps Tech Stack (Currently Learning)
      </Heading>
      <UnorderedList>
        <ListItem>
          Programming Language:{' '}
          <Link href={`https://www.python.org/`} title={`Python`}>
            Python
          </Link>{' '}
          +{' '}
          <Link
            href={`https://www.javascript.com/`}
            title={`JavaScript`}
          >
            JavaScript
          </Link>
        </ListItem>
        <ListItem>
          Monitoring &amp; Logging:{' '}
          <Link href={`https://prometheus.io/`} title={`Prometheus`}>
            Prometheus
          </Link>{' '}
          +{' '}
          <Link
            href={`https://www.elastic.co/kibana`}
            title={`Kibana`}
          >
            Kibana
          </Link>
        </ListItem>
        <ListItem>
          Containerisation:{' '}
          <Link href={`https://kubernetes.io/`} title={`Kubernetes`}>
            Kubernetes
          </Link>{' '}
          +{' '}
          <Link href={`https://www.docker.com/`} title={`Docker`}>
            Docker
          </Link>
        </ListItem>
        <ListItem>
          Virtualisation:{' '}
          <Link href={`https://www.vmware.com/`} title={`VMware`}>
            VMware
          </Link>
        </ListItem>
        <ListItem>
          Cloud Computation:{' '}
          <Link href={`https://cloud.linode.com/`} title={`Linode`}>
            Linode
          </Link>{' '}
          +{' '}
          <Link href={`https://aws.amazon.com/`} title={`AWS`}>
            AWS
          </Link>{' '}
          +{' '}
          <Link
            href={`https://cloud.google.com/`}
            title={`Google Cloud`}
          >
            Google Cloud
          </Link>
        </ListItem>
        <ListItem>
          Security:{' '}
          <Link href={`https://www.vaultproject.io/`} title={`Vault`}>
            Vault
          </Link>
        </ListItem>
        <ListItem>
          Provisioning:{' '}
          <Link
            href={`https://www.terraform.io/`}
            title={`Terraform`}
          >
            Terraform
          </Link>{' '}
          and{' '}
          <Link href={`https://www.ansible.com/`} title={`Ansible`}>
            Ansible
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading id="development-services">
        Development Services
      </Heading>
      <UnorderedList>
        <ListItem>
          Code Repositories:{' '}
          <Link href={`https://github.com/`} title={`GitHub`}>
            GitHub
          </Link>{' '}
          &amp;{' '}
          <Link href={`https://about.gitlab.com/`} title={`GitLab`}>
            GitLab
          </Link>
        </ListItem>
        <ListItem>
          Domain Name Provider:{' '}
          <Link
            href={`https://www.namecheap.com/`}
            title={`Namecheap`}
          >
            Namecheap
          </Link>
        </ListItem>
        <ListItem>
          Server Host:{' '}
          <Link href={`https://cloud.linode.com/`} title={`Linode`}>
            Linode
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading id="i-built-this-site-using-">
        I built this site using:
      </Heading>
      <Text>
        I built this site &lt;/&gt; using the following technologies:
      </Text>
      <UnorderedList>
        <ListItem>Gatsby</ListItem>
        <ListItem>React</ListItem>
        <ListItem>Markdown</ListItem>
        <ListItem>GitHub Pages</ListItem>
        <ListItem>Chakra UI</ListItem>
      </UnorderedList>
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
