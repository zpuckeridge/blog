import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Comments from "../components/comments"
import Tags from "../components/tags"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const tags = post.frontmatter.tags

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date} ◦ </small>
          {tags && tags.length > 0 ? `` : ` ◦ `}
          <Tags>{tags}</Tags>
          <small> ◦ </small>
          <small>{post.frontmatter.readingTime}</small>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />

        <Bio />
      </article>
      <nav className="blog-post-nav desktop-only">
        <ul className="article-navigation-container">
          <li className="article-navigation">
          <div className="navigation-title">← Previous Article</div>
            {previous && (
              <Link className="navigation-link" to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            )}
            
          </li>
          <li className="article-navigation">
          <div className="navigation-title pull-right">Next Article →</div>
            {next && (
              <Link className="navigation-link pull-left" to={next.fields.slug} rel="next">
                {next.frontmatter.title}
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Comments />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        readingTime
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
