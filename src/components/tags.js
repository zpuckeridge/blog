import React from "react"

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
          {t}
        </li>
      ))}
    </ul>
  )

export default Tags