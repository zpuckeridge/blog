import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import kebabCase from "lodash/kebabCase"

class TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageTitle = "Tags"
    const tags = data.tagsGroup.group

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title={pageTitle} />
        <Bio />

        <h1>{pageTitle}</h1>

        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`