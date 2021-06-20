import React, { useState } from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import {
  Input,
  Tooltip,
  Box,
  Link,
  Flex,
  chakra,
  Button,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

import Seo from '../components/seo'
import Tags from '../components/tags'

const ArticleIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const [state, setState] = useState({
    filteredPosts: [],
    query: '',
  })

  const handleInputChange = event => {
    const query = event.target.value
    const filteredPosts = posts.filter(post => {
      const title = post.frontmatter.title
      const tags = post.frontmatter.tags
      const description = post.frontmatter.description
      return (
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        tags.toLowerCase().includes(query.toLowerCase())
      )
    })
    setState({
      query,
      filteredPosts,
    })
  }

  const postsFiltered = state.query ? state.filteredPosts : posts

  if (posts.length === 0) {
    return (
      <>
        <Seo title="No Posts Found" />
        <p>No articles found.</p>
      </>
    )
  }

  return (
    <>
      <Seo title="Articles" />
      <Input
        marginTop="2rem"
        marginBottom="1rem"
        type="text"
        size="lg"
        aria-label="Search"
        placeholder="Search articles"
        variant="filled"
        value={state.query}
        onChange={handleInputChange}
        boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
      />
      <Box align="right">
        <Link
          as={GatsbyLink}
          to="/tags"
          _hover={{
            textDecor: 'none',
          }}
        >
          <Button size="xs" marginBottom="2rem">
            View Tags
          </Button>
        </Link>
      </Box>
      <Box mb="4rem">
        {postsFiltered.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags

          return (
            <>
              <Flex
                marginBottom="1rem"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  px={8}
                  py={4}
                  rounded="20px"
                  minWidth="full"
                  boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
                  bg={'brand.800'}
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <chakra.span fontSize="sm" color="#c3c8d3">
                      {post.frontmatter.date} •{' '}
                      {post.fields.readingTime.text} •{' '}
                      {post.fields.readingTime.words} words
                    </chakra.span>
                    <Button size="xs">
                      <Tags>{tags}</Tags>
                    </Button>
                  </Flex>

                  <Box mt={2}>
                    <Link
                      as={GatsbyLink}
                      to={post.fields.slug}
                      fontSize="2xl"
                      color={('gray.700', 'white')}
                      fontWeight="700"
                      _hover={{
                        color: '#30ce56',
                        textDecor: 'none',
                      }}
                    >
                      {title}
                    </Link>
                    <chakra.p mt={2} color="#c3c8d3">
                      {post.frontmatter.description}
                    </chakra.p>
                  </Box>

                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={4}
                  >
                    <Button size="sm">
                      <Link
                        color="white"
                        _hover={{
                          textDecor: 'none',
                        }}
                        as={GatsbyLink}
                        to={post.fields.slug}
                      >
                        Read more
                      </Link>
                    </Button>

                    <Flex alignItems="center">
                      <Tooltip
                        hasArrow
                        label="Copy URL"
                        bg="gray.300"
                        color="black"
                      >
                        <CopyIcon />
                      </Tooltip>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </>
          )
        })}
      </Box>
    </>
  )
}

export default ArticleIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        fields {
          readingTime {
            text
            words
          }
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
