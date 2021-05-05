import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
        
        <div className="nav">
        <a href="/" className="nav-header">Zacchary's Blog</a>
          <a href="https://zacchary.me/" className="nav-button">
            Home
          </a>
          <a href="/" className="nav-button">
            Blog
          </a>
          <a href="https://zacchary.me/cv" className="nav-button">
            CV
          </a>
        </div>
      <main>{children}</main>
      <footer>
        © Zacchary Puckeridge {new Date().getFullYear()} | Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
