import React from 'react'

import { Link as GatsbyLink } from 'gatsby'
import { UnorderedList, ListItem, Link } from '@chakra-ui/react'
import { kebabCase } from 'lodash'

const Tags = ({ children }) =>
  children && (
    <UnorderedList
      style={{
        marginBottom: 0,
        marginLeft: 0,
        display: 'inline-flex',
      }}
    >
      {children.split(', ').map(t => (
        <ListItem listStyleType="none" key={t}>
          <Link
            as={GatsbyLink}
            to={`/tags/${kebabCase(t)}/`}
            color="white"
            title={`Tags`}
            _hover={{ textDecor: 'none' }}
          >
            {t}
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  )

export default Tags
