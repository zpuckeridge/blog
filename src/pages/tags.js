import React from 'react'
import { Link, graphql } from 'gatsby'

import Seo from '../components/seo'

import kebabCase from 'lodash/kebabCase'

class TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const pageTitle = 'Tags'
    const tags = data.tagsGroup.group

    return (
      <>
        <Seo title={pageTitle} />
        <h3>{pageTitle}</h3>

        <ul style={{ listStyle: `none` }}>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </>
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
