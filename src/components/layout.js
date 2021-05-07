import * as React from "react"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
        
        <div className="nav">
        <a href="/" className="nav-header">zacchary.me</a>
          <a href="/" className="nav-button">
            Home
          </a>
          <a href="/about" className="nav-button">
            About
          </a>
        </div>
      <main>{children}</main>
      <footer>
        © Zacchary Puckeridge {new Date().getFullYear()}
        <a href="#" className="back-to-top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default Layout
