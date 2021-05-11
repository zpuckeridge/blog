import * as React from "react"

import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home | Zacchary Puckeridge" />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Helmet>
      <div class="home-content">
        <div class="profile-wrapper">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../images/profile-pic.png"
            width={250}
            height={250}
            quality={100}
            alt="Profile Picture"
          />
        </div>
        <div class="social-links">
          <a
            class="social-link"
            title="GitHub Profile"
            href="https://github.com/zpuckeridge"
            target="_self"
          >
            <span class="icon">
              <i class="fab fa-github-square"></i>
            </span>
          </a>
          <a
            class="social-link"
            title="LinkedIn"
            href="https://www.linkedin.com/in/zpuckeridge/"
            target="_self"
          >
            <span class="icon">
              <i class="fab fa-linkedin"></i>
            </span>
          </a>
          <a
            class="social-link"
            title="Email"
            href="mailto:zacchary@puckeridge.me"
            target="_self"
          >
            <span class="icon">
              <i class="fas fa-envelope-square"></i>
            </span>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
