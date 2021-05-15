import React from "react"
import { Link } from "gatsby"

const Tags = ({ children }) =>
  children && (
    <ul style={{ marginBottom: 0, marginLeft: 0, display: "inline-flex" }}>
      {children.split(", ").map(t => (
        <li
          key={t}
          style={{
            borderRadius: `4px`,
            padding: `2px 6px`,
            marginLeft: `-40px`,
            fontSize: `80%`,
            backgroundColor: "#161B22",
            color: "white",
            listStyle: "none",
          }}
        >
        <Link to="/tags">
          {t}
        </Link>
        </li>
      ))}
    </ul>
  )

export default Tags