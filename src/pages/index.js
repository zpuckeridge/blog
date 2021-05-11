import * as React from "react"

import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home | Zacchary Puckeridge" />
      <div class="outer-container">
          <div class="container">
              <p class="name-header">Zacchary Puckeridge</p>
              <Bio />
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
