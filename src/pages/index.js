import * as React from "react"

import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home | Zacchary Puckeridge" />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Helmet>
      <div className="outer-container">
        <div className="home-container">
          <p className="name-header">Zacchary Puckeridge</p>
          <Bio />
          <div className="social-icons">
            <div>
              <table>
                <tr>
                  <th>
                    <a className="no-underline" href="https://github.com/zpuckeridge">
                      <span className="social-icon">
                        <i className="fab fa-github-square"></i>
                      </span>
                    </a>
                  </th>
                  <th>
                    <a href="https://www.linkedin.com/in/zpuckeridge/">
                      <span className="social-icon">
                        <i className="fab fa-linkedin"></i>
                      </span>
                    </a>
                  </th>
                  <th>
                    <a href="/blog/">
                      <span className="social-icon">
                        <i className="fas fa-rss-square"></i>
                      </span>
                    </a>
                  </th>
                </tr>
              </table>
            </div>
          </div>
          <div className="description">
            <a href="/about/">Click here to learn more about me!</a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
