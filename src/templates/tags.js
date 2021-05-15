import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

class TagsTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { blogPosts, totalCount } = this.props.data.allMarkdownRemark
    const currentTag = this.props.pageContext.tag
    const postsCounter = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${currentTag}"`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title={currentTag} />
        <Bio />
        <h1>Tag: {currentTag}</h1>
        <p>{postsCounter}</p>

        <ul>
          {blogPosts.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/tags">View all tags</Link>
      </Layout>
    )
  }
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      blogPosts: edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`