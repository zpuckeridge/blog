import * as React from 'react'

import { graphql } from 'gatsby'

import Seo from '../components/seo'

const UsesPage = () => {
  return (
    <>
      <Seo title="Uses" />
      <p>
        A compiled list of the tools, tech stack, programs and
        hardware I use on a daily basis.
      </p>
      <h3 id="operating-system-hardware">
        Operating System &amp; Hardware
      </h3>
      <p>
        I am currently Dual Booting{' '}
        <a href={`https://pop.system76.com/`} title={`Pop!_OS`}>
          POP!_OS
        </a>{' '}
        and{' '}
        <a
          href={`https://www.microsoft.com/en-au/software-download/windows10`}
          title={`Windows 10`}
        >
          Windows 10.
        </a>
      </p>
      <p>My rig has the following specifications:</p>
      <ul>
        <li>CPU: Ryzen 2700X</li>
        <li>GPU: NVIDIA GTX 1080</li>
        <li>RAM: Corsair 4 x 8GB 3200MHz</li>
        <li>MBO: ASRock Taichi X370</li>
        <li>PSU: Corsair Gold 650W</li>
        <li>HDD: Western Digital 2TB</li>
        <li>SSD: Western Digital 480GB M.2</li>
      </ul>
      <p>For audio, I&#39;m using the following:</p>
      <ul>
        <li>Amplification: Focusrite Scarlett Solo</li>
        <li>Microphone: AT2020</li>
        <li>Headphones: Beyerdynamic DT 770 + Koss KPH30i</li>
      </ul>
      <h3 id="gadgets">Gadgets</h3>
      <ul>
        <li>Phone - Samsung Galaxy S20 Ultra 5G</li>
        <li>Camera - Nikon D3200</li>
      </ul>
      <h3 id="editor-terminal">Editor &amp; Terminal</h3>
      <p>Visual Studio Code is my primary editor.</p>
      <ul>
        <li>
          I use the{' '}
          <a
            href={`https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme/`}
            title={`Visual Studio Code Marketplace`}
          >
            GitHub
          </a>{' '}
          Theme
        </li>
        <li>
          Shell:{' '}
          <a href={`https://www.zsh.org/`} title={`ZSH`}>
            Zsh
          </a>
        </li>
        <li>Shell Theme: robbyrussell</li>
      </ul>
      <h3 id="tools">Tools</h3>
      <ul>
        <li>
          My primary Web Browsers are{' '}
          <a
            href={`https://librewolf-community.gitlab.io/`}
            title={`Librewolf`}
          >
            LibreWolf
          </a>{' '}
          and{' '}
          <a href={`https://brave.com/`} title={`Brave`}>
            Brave
          </a>
          . These are both great privacy respecting choices that allow
          me to develop for both platforms.
        </li>
        <li>
          Password Manager:{' '}
          <a href={`https://bitwarden.com/`} title={`Bitwarden`}>
            Bitwarden
          </a>
        </li>
        <li>
          Technology Stack Detection:{' '}
          <a
            href={`https://www.wappalyzer.com/`}
            title={`Wappalyzer`}
          >
            Wappalyzer
          </a>
        </li>
        <li>
          Communication:{' '}
          <a href={`https://slack.com/intl/en-au/`} title={`Slack`}>
            Slack
          </a>{' '}
          and{' '}
          <a href={`https://discord.com/brand-new`} title={`Discord`}>
            Discord
          </a>
        </li>
        <li>
          Ad Blocking:{' '}
          <a href={`https://pi-hole.net/`} title={`Pi-Hole`}>
            Pi-Hole
          </a>
        </li>
        <li>
          Two Factor Authentication:{' '}
          <a
            href={`https://getaegis.app/`}
            title={`Aegis Authenticator`}
          >
            Aegis Authenticator
          </a>
        </li>
      </ul>
      <h3 id="cli-tools">CLI Tools</h3>
      <ul>
        <li>
          <a href={`https://ohmyz.sh/`} title={`Oh My Zsh`}>
            Oh My Zsh
          </a>
        </li>
      </ul>
      <h3 id="self-hosted-tools">Self Hosted Tools</h3>
      <ul>
        <li>
          Virtualisation:{' '}
          <a href={`https://www.proxmox.com/en/`} title={`Proxmox`}>
            Proxmox
          </a>
        </li>
      </ul>
      <h3 id="preferred-tech-stack">
        DevOps Tech Stack (Currently Learning)
      </h3>
      <ul>
        <li>
          Programming Language:{' '}
          <a href={`https://www.python.org/`} title={`Python`}>
            Python
          </a>{' '}
          +{' '}
          <a
            href={`https://www.javascript.com/`}
            title={`JavaScript`}
          >
            JavaScript
          </a>
        </li>
        <li>
          Monitoring &amp; Logging:{' '}
          <a href={`https://prometheus.io/`} title={`Prometheus`}>
            Prometheus
          </a>{' '}
          +{' '}
          <a href={`https://www.elastic.co/kibana`} title={`Kibana`}>
            Kibana
          </a>
        </li>
        <li>
          Containerisation:{' '}
          <a href={`https://kubernetes.io/`} title={`Kubernetes`}>
            Kubernetes
          </a>{' '}
          +{' '}
          <a href={`https://www.docker.com/`} title={`Docker`}>
            Docker
          </a>
        </li>
        <li>
          Virtualisation:{' '}
          <a href={`https://www.vmware.com/`} title={`VMware`}>
            VMware
          </a>
        </li>
        <li>
          Cloud Computation:{' '}
          <a href={`https://cloud.linode.com/`} title={`Linode`}>
            Linode
          </a>{' '}
          +{' '}
          <a href={`https://aws.amazon.com/`} title={`AWS`}>
            AWS
          </a>{' '}
          +{' '}
          <a
            href={`https://cloud.google.com/`}
            title={`Google Cloud`}
          >
            Google Cloud
          </a>
        </li>
        <li>
          Security:{' '}
          <a href={`https://www.vaultproject.io/`} title={`Vault`}>
            Vault
          </a>
        </li>
        <li>
          Provisioning:{' '}
          <a href={`https://www.terraform.io/`} title={`Terraform`}>
            Terraform
          </a>{' '}
          and{' '}
          <a href={`https://www.ansible.com/`} title={`Ansible`}>
            Ansible
          </a>
        </li>
      </ul>
      <h3 id="development-services">Development Services</h3>
      <ul>
        <li>
          Code Repositories:{' '}
          <a href={`https://github.com/`} title={`GitHub`}>
            GitHub
          </a>{' '}
          &amp;{' '}
          <a href={`https://about.gitlab.com/`} title={`GitLab`}>
            GitLab
          </a>
        </li>
        <li>
          Domain Name Provider:{' '}
          <a href={`https://www.namecheap.com/`} title={`Namecheap`}>
            Namecheap
          </a>
        </li>
        <li>
          Server Host:{' '}
          <a href={`https://cloud.linode.com/`} title={`Linode`}>
            Linode
          </a>
        </li>
      </ul>
      <h3 id="i-built-this-site-using-">I built this site using:</h3>
      <p>
        I built this site &lt;/&gt; using the following technologies:
      </p>
      <ul>
        <li>Gatsby</li>
        <li>React</li>
        <li>Markdown</li>
        <li>GitHub Pages</li>
        <li>Fontawesome</li>
      </ul>
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
