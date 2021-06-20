import * as React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import {
  Button,
  Flex,
  Box,
  SimpleGrid,
  Heading,
  Text,
  Link,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { StaticImage } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import Comments from '../components/comments'
import Tags from '../components/tags'

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const tags = post.frontmatter.tags
  const { previous, next } = data

  return (
    <>
      <Seo title={post.frontmatter.title} />
      <Box marginBottom="2rem">
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <Link
              as={GatsbyLink}
              to="/"
              _hover={{ textDecor: 'none', color: '#30ce56' }}
            >
              Home
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link
              as={GatsbyLink}
              to="/articles/"
              _hover={{ textDecor: 'none', color: '#30ce56' }}
            >
              Articles
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Link
              as={GatsbyLink}
              to="#"
              _hover={{ textDecor: 'none', color: '#30ce56' }}
            >
              {post.frontmatter.title}
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Heading marginBottom="2rem">{post.frontmatter.title}</Heading>
      <Flex alignItems="center" my={{ base: 2, md: 0 }}>
        <Link
          as={GatsbyLink}
          to="/about"
          title="About"
          _hover={{ textDecor: 'none' }}
        >
          <Button
            borderRadius="full"
            marginRight={1}
            alignContent="center"
            size="sm"
          >
            <Box marginRight={2} marginLeft={-2}>
              <StaticImage
                quality={100}
                src="../../src/images/profile-pic.jpg"
                alt="Zacchary Puckeridge"
                width={25}
                height={25}
                style={{ borderRadius: `100%` }}
              />
            </Box>
            Zacchary Puckeridge
          </Button>
        </Link>
        {post.frontmatter.date}
        <Spacer />
        <Text marginRight={2}>
          {post.fields.readingTime.text} •{' '}
          {post.fields.readingTime.words} words
        </Text>
        <Button size="xs" borderRadius="full">
          <Tags>{tags}</Tags>
        </Button>
      </Flex>

      <Flex alignItems="center" my={{ base: 2, md: 0 }}>
        <Text marginBottom="2rem"></Text>
      </Flex>

      <section dangerouslySetInnerHTML={{ __html: post.html }} />

      <SimpleGrid marginTop={4} columns={2} spacing={4}>
        <Box
          px={8}
          py={4}
          rounded="20px"
          boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
          bg={'brand.800'}
        >
          <Heading fontSize="md">← Previous Article</Heading>
          {previous && (
            <Link
              as={GatsbyLink}
              to={previous.fields.slug}
              rel="prev"
              _hover={{ textDecor: 'none', color: '#30ce56' }}
            >
              {previous.frontmatter.title}
            </Link>
          )}
        </Box>
        <Box
          align="right"
          px={8}
          py={4}
          rounded="20px"
          boxShadow="0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);"
          bg={'brand.800'}
        >
          <Heading fontSize="md">Next Article →</Heading>
          {next && (
            <Link
              as={GatsbyLink}
              to={next.fields.slug}
              rel="next"
              _hover={{ textDecor: 'none', color: '#30ce56' }}
            >
              {next.frontmatter.title}
            </Link>
          )}
        </Box>
      </SimpleGrid>
      <Comments />
    </>
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
      }
      fields {
        readingTime {
          text
          words
        }
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
