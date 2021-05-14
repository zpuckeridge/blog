import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Gallery = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Gallery | Zacchary Puckeridge" />
      <h1>Gallery</h1>
      <p>Hey - this page isn't finished yet... Check back soon!</p>
    </Layout>
  )
}

export default Gallery

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
