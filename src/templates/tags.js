import React from 'react'
import { Link, graphql } from 'gatsby'

import { Heading, Box, Center, UnorderedList, ListItem, Text, Button } from '@chakra-ui/react'

import { Link as GatsbyLink } from 'gatsby'

import Seo from '../components/seo'

class TagsTemplate extends React.Component {
  render() {
    const { blogPosts, totalCount } =
      this.props.data.allMarkdownRemark
    const currentTag = this.props.pageContext.tag
    const postsCounter = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${currentTag}"`

    return (
      <>
        <Seo title={currentTag} />
        <Box minH="82.5vh">
        <Center>
        <Box align="center">
        <Heading fontSize="4xl">{currentTag}</Heading>
        <Text
          fontSize="2xl"
          color="white"
          textAlign="center"
        >
          {postsCounter}
        </Text>
        </Box>
        </Center>

        <UnorderedList>
          {blogPosts.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <ListItem key={slug}>
                <Link to={slug}>{title}</Link>
              </ListItem>
            )
          })}
        </UnorderedList>
        <Box marginTop="2rem">
        <Button
            as={GatsbyLink}
            to="/tags/"
            title="Tags"
            color="white"
          >
            View all tags
          </Button>
        </Box>
        </Box>
      </>
    )
  }
}

export default TagsTemplate

export const pageQuery = graphql`
  query ($tag: String) {
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
