import * as React from "react"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const handleClick = () => {
    window.scrollTo(0,0);
  }

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
        <button className="back-to-top" onClick={handleClick}>Back to top ↑</button>
      </footer>
    </div>
  )
}

export default Layout
