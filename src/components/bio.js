import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={100}
        alt="Profile Picture"
      />
      <p>
        <span role="img" aria-label="wave">
          👋
        </span>{" "}
        I'm Zacchary Puckeridge. I'm a{" "}
        <span role="img" aria-label="laptop">
          💻
        </span>{" "}
        <strong>web developer</strong> with a passion for{" "}
        <span role="img" aria-label="cog">
          ⚙
        </span>{" "}
        <strong>technology</strong>,{" "}
        <span role="img" aria-label="motorcycle">
          🏍
        </span>{" "}
        <strong>motorcycles</strong>,{" "}
        <span role="img" aria-label="camera">
          📷
        </span>{" "}
        <strong>photography</strong> and{" "}
        <span role="img" aria-label="headphones">
          🎧
        </span>{" "}
        <strong>music</strong>.
      </p>
    </div>
  )
}

export default Bio
