---
title: "🎫 How to add tags to Gatsby"
slug: add-tags-gatsby-blog
date: "2021-05-16"
tags: Gatsby
description: Adding tags can be a little tricky when when using your own custom
  styles. This article aims to shed some light on how to add tags!
socialImage: images/tags.jpg
---

Adding tags to our Gatsby Blog will allow users to see other content
associated to the post they are viewing or category they are
interested in. The Gatsby Documentation has very detailed document on
setting up tags
[here](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/),
which we are using as a guide.

We will be creating a separate tags page which will allow end users to
view all the tags active on the site and their assigned posts.

### Adding Tags to your Markdown Files

We can add tags to our blog posts simply by adding another line in the
frontmatter of our markdown file. The frontmatter of a markdown file
is the area at the top which includes post data like the time and date
of publishing.

We can add our tags to our blog posts like so:

```MD
---
title: "🎫 Add Tags to your Gatsby Blog"
tags: Technical
---

Blog Post content...
```

<blockquote id='blockquote-warning'>
Make sure you restart your server so that it has a chance to grab the new tags in your markdown!
</blockquote>

### Adding Tags to the BlogPage GraphQL Query

We need to ensure that we add the line `tags` to our frontmatter so
that our GraphQL can query for the result.

```JS {17}
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
```

### Tags Page Template

Let's setup a page for our end users to view all of our tags and their
associated posts.

First, you'll need to add a new file to `src/templates/` called
`tags.js`.

I've included a basic template below to create a page using the
gatsby-starter-blog theme.

```JS
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

className TagsTemplate extends React.Component {
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
```

### Configuring `gatsby-node.js` to Render Pages

Now it's time for us to ensure that `gatsby-node.js` knows what it
needs to do with our template page.

We will:

- Add the tags field to the GraphQL Query
- Create invididual tags using the tag template
- Include the `lodash` library

We will be using `kebabCase` to create our slugged paths for unique
tag pages, hence why we need to use a library called `lodash`.

I've included my `gatsby-node.js` file as an example below:

```JS {10, 25, 29-31, 68-81}
const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define Page Templates
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/tags.js`)

  // Sort Markdown Posts by Date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `An error occurred while loading the blog posts.`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Extract tag data from query.
  const tags = result.data.tagsGroup.group

  // Make tag pages.
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }
    type Author {
      name: String
      summary: String
    }
    type Social {
      twitter: String
    }
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    type Fields {
      slug: String
    }
  `)
}
```

### Creating an Index Page for Tags

Let's create a page designed to list all of our tags along with the
number of posts associated with that tag. To do so, we need to create
a new file at `src/pages/` called `tags.js` with the following code:

<blockquote id="blockquote-success">
Feel free to update the filenames if you get confused! Just be aware, you'll need to update the import code to ensure that there are no conflicts.
</blockquote>

```JS
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import kebabCase from "lodash/kebabCase"

className TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageTitle = "Tags"
    const tags = data.tagsGroup.group

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title={pageTitle} />

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
```

### Creating the Tag Component

Now that we've got ourselves a Tag Index, it's time to create our tag
component, the piece of code we'll use to put wherever we want in our
pages.

We'll need to create a file called `tags.js` in `src/components/`.
I've included the code that I used for my blog below:

```JS
import React from "react"
import { Link } from "gatsby"

import { kebabCase } from 'lodash';

const Tags = ({ children }) =>
  children && (
    <ul style={{ marginBottom: 0, marginLeft: 0, display: "inline-flex" }}>
      {children.split(", ").map(t => (
        <li key={t} className="tag-style">
        <Link to={`/tags/${kebabCase(t)}/`}>
          {t}
        </Link>
        </li>
      ))}
    </ul>
  )

export default Tags
```

Effectively, we are assigning some styles and formatting to our tag.
We're also using `kebabCase` to set the URL of our tag.

To do this, we are pulling the tag name and putting that directly in
place of the URL. Since we've already generated our tag pages, this is
the most painless solution.

### Importing Tag Component

Now we have our Tag Component, we can import it into our `blog.js`
page and `blog-post.js` template like so:

#### Blog Index

```JS {7, 30, 80, 46, 47}
import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="No Posts Found" />
        <p>No blog posts found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Blog | Zacchary Puckeridge" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date} ◦ </small>
                  {tags && tags.length > 0 ? `` : ` ◦ `}
                  <Tags>{tags}</Tags><small> ◦ </small>
                  <small>{post.fields.readingTime}</small>
                </header>
                <section>
                  <p>{post.frontmatter.description}</p>
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
```

#### Blog Post Template

```JS {8, 14, 30, 88}
import * as React from "react"
import { Link, graphql } from "gatsby"

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
          <Tags>{tags}</Tags>
          <small> ◦ </small>
          <small>{post.frontmatter.readingTime}</small>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      <nav className="blog-post-nav desktop-only">
        <ul className="article-navigation-container">
          <li className="article-navigation">
          <div className="navigation-title-prev">← Previous Article</div>
            {previous && (
              <Link className="navigation-link-prev" to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            )}

          </li>
          <li className="article-navigation">
          <div className="navigation-title-next">Next Article →</div>
            {next && (
              <Link className="navigation-link-next" to={next.fields.slug} rel="next">
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
```

### Test it out!

Now that we've got all the pieces we need to have a fully functioning
tag system in place, we need to test it all works! Throw your blog
into development mode and take a test drive. If you run into any
issues, you may need to tweak the styling to match your site
theme/configuration.

### Conclusion

Tags are incredibly important to any good blogging site. The Gatsby
documentation can be a little confusing in it's approach to implement
them, so I hope I've helped a little to provide an alternative
configuration!

If you have any questions or think I could have taken a better
approach, let me know! Feel free to reach out in the comments below or
reach out to me via [email](mailto:zacchary@puckeridge.me).
