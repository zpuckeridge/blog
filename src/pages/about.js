import * as React from "react"
import { graphql } from "gatsby"

import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Bio from "../components/bio"
import Seo from "../components/seo"

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <Seo title="About | Zacchary Puckeridge" />
        <Helmet>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
        </Helmet>
        <main>
          <header id="header">
            <div className="container">
              <div>
                <Bio />

                <a
                  href="../static/../resume.pdf"
                  target="_blank"
                  className="pull-right"
                >
                  Download my résumé
                </a>

                <div>
                  <a
                    className="social-button"
                    title="Blog"
                    href="https://zacchary.me"
                    target="_self"
                  >
                    <span className="icon is-large">
                      <i className="fas fa-book-open"></i>
                    </span>
                  </a>

                  <a
                    className="social-button"
                    title="GitLab Profile"
                    href="https://gitlab.com/zpuckeridge"
                    target="_self"
                  >
                    <span className="icon is-large">
                      <i className="fab fa-gitlab"></i>
                    </span>
                  </a>

                  <a
                    className="social-button"
                    title="GitHub Profile"
                    href="https://github.com/zpuckeridge"
                    target="_self"
                  >
                    <span className="icon is-large">
                      <i className="fab fa-github"></i>
                    </span>
                  </a>

                  <a
                    className="social-button"
                    title="Music"
                    href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=RmyKcqTUQQeDeirb5CB78w"
                    target="_self"
                  >
                    <span className="icon is-large">
                      <i className="fas fa-music"></i>
                    </span>
                  </a>

                  <a
                    className="social-button"
                    title="Personal Dashboard"
                    href="https://dash.zacchary.me"
                    target="_self"
                  >
                    <span className="icon is-large">
                      <i className="fas fa-server"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </header>
          <body id="content" className="container">
            <section id="about">
              <div className="about-title">
                <h2>About</h2>
              </div>
              <div>
                <p>
                  I am a Web Developer looking to further develop my skills in
                  the IT industry by utilising and adapting to new and existing
                  technologies to bolster businesses and improve workflows.
                </p>
              </div>
            </section>

            <section id="profiles">
              <div className="about-title">
                <h2>Profiles</h2>
              </div>
              <div>
                <div>
                  <div className="row">
                    <div className="column">
                      <strong className="network">LinkedIn</strong>
                      <div className="username">
                        <div className="url">
                          <a href="https://www.linkedin.com/in/zpuckeridge/">
                            zpuckeridge
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <strong className="network">GitLab</strong>
                      <div className="username">
                        <div className="url">
                          <a href="https://gitlab.com/zpuckeridge">
                            zpuckeridge
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <strong className="network">GitHub</strong>
                      <div className="username">
                        <div className="url">
                          <a href="https://github.com/zpuckeridge/">
                            zpuckeridge
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <strong className="network">Gallery</strong>
                      <div className="username">
                        <div className="url">
                          <a href="/gallery">
                            Check it out!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="work">
              <div className="about-title">
                <h2>Work</h2>
              </div>
              <div>
                <div>
                  <div>
                    <h4 className="strike-through">
                      <span>Dev Demand Co.</span>
                      <span className="date">May 2020 — May 2021</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://devdemand.co">https://devdemand.co</a>
                    </div>
                    <div className="position">Junior Dev Ops</div>
                    <div className="summary">
                      <p>
                        Exceptional adaptability in tackling backend server
                        related issues. Worked in the administration of varying
                        systems in size and complexity. Delved into the inner
                        workings of Kubernetes and participated in the
                        development of multiple client related projects.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>Conetix Web Hosting</span>
                      <span className="date">September 2018 — May 2020</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://conetix.com.au">
                        https://conetix.com.au
                      </a>
                    </div>
                    <div className="position">Technical Support Staff</div>
                    <div className="summary">
                      <p>
                        Provided techincal support across a wide range of
                        various web related technologies including WordPress,
                        Office 365, Plesk, Windows Server and more. Adept at
                        following, editing and writing techincal processes and
                        procedures and supporting customers over the phone.
                        Maintained multiple Linux and Windows based servers.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>Camp Highroad</span>
                      <span className="date">May 2018 — September 2018</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://www.camphighroad.org/">
                        https://camphighroad.org
                      </a>
                    </div>
                    <div className="position">Christian Camp Counsellor</div>
                    <div className="summary">
                      <p>
                        Led campers through various team building and
                        extra-curricular activities. Worked to develop
                        meaningful relationships with campers, parents and other
                        counsellors. Shared the Gospel with multiple groups of
                        kids over the course of seven weeks and helped instill
                        Christlike values.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>Hungry Jack's</span>
                      <span className="date">November 2016 — May 2018</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://www.hungryjacks.com.au/">
                        https://hungryjacks.com.au
                      </a>
                    </div>
                    <div className="position">Crew Member</div>
                    <div className="summary">
                      <p>
                        Developed strong time management skills and the ability
                        to work in stressful environments. Led and trained Crew
                        Members in appropriate processes and procedures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="volunteer">
              <div className="about-title">
                <h2>Volunteer</h2>
              </div>
              <div>
                <div>
                  <div>
                    <h4 className="strike-through">
                      <span>Chaplain Watch</span>
                      <span className="date">November 2020 — Present</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://www.chaplainwatch.org.au/">
                        https://chaplainwatch.org.au
                      </a>
                    </div>
                    <div className="position">Night Watch Staff</div>
                    <div className="summary">
                      <p>
                        Chaplain Watch is a Christian community service charity,
                        designed to intentionally intervene where people are in
                        crisis, at risk, and in need. Once a month, I volunteer
                        my time to apply First Aid and support public safety in
                        Brisbane's night precinct.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>GENTS Camp</span>
                      <span className="date">2017 — Present</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://gentscamp.com/">https://gentscamp.com</a>
                    </div>
                    <div className="position">Camp Leader</div>
                    <div className="summary">
                      <p>
                        GENTS Camp is a Christian school holiday program for
                        boys, with a range of camps for both primary and
                        secondary students where they get to particpate in
                        activites like tubing, cable skiing, wake boarding,
                        tribal challenges and more. The camp is designed to show
                        young guys what becoming a Christian man is really
                        about. The camp is a great chance to share the gospel
                        with those that may not have heard it. I've been going
                        to GENTS Camp as a leader since 2017 and love helping
                        out!
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>Minden Baptist Church</span>
                      <span className="date">February 2020 — October 2020</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://mindenbaptist.org/">
                        https://mindenbaptist.org
                      </a>
                    </div>
                    <div className="position">Sound Technician</div>
                    <div className="summary">
                      <p>
                        I volunteered my time as a Sound Technician at Minden
                        Baptist Church to setting up, mixing, and packing down
                        equipment before, during and after Church Services.
                        Additionally, I operated cameras, livestreams and
                        performed maintenance on these systems while I attended.
                        I also revamped the churches website, although not
                        perfect - is certainly much better than before!
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>Kingsridge Baptist Church</span>
                      <span className="date">September 2017 — May 2018</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://www.kingsridgebaptist.org/">
                        https://kingsridgebaptist.org
                      </a>
                    </div>
                    <div className="position">Sound Technician / Youth Leader</div>
                    <div className="summary">
                      <p>
                        At Kingsridge Baptist Church, I volunteered my time as a
                        Youth Leader and Sound Technician. These
                        responsibilities also included recording, live streaming
                        and editing videos for the church.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="strike-through">
                      <span>Faith Bound</span>
                      <span className="date">October 2017 — Present</span>
                    </h4>
                    <div className="website pull-right">
                      <a href="https://faithbound.gg/">https://faithbound.gg</a>
                    </div>
                    <div className="position">Owner</div>
                    <div className="summary">
                      <p>
                        I founded Faith Bound as a Christian Community Discord
                        cantered around fellowship and sharing the truth of the
                        Gospel. We are a community primarily based in Australia
                        who seek to grow together as brothers and sisters in
                        Christ while sharing the good news found in the Bible -
                        God's abounding love for us displayed perfectly in the
                        death of Jesus Christ.
                      </p>
                    </div>
                    <h5>Highlights</h5>
                    <ul className="highlights">
                      <li>Community Gaming Sessions</li>
                      <li>Regular Bible studies and debates on scripture</li>
                      <li>
                        Maintained and moderated a community with over 250
                        active members
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="education">
              <div className="about-title">
                <h2>Education</h2>
              </div>
              <div>
                <h4 className="strike-through">
                  <span>TAFE</span>
                  <span className="date">January 2019 — January 2020</span>
                </h4>
                <div className="area">Information Technologies & Digital Media</div>
                <div className="studyType">Certificate III</div>
              </div>
              <div>
                <h4 className="strike-through">
                  <span>Plesk University</span>
                  <span className="date">January 2020 — June 2020</span>
                </h4>
                <div className="area">Plesk Professional Certification</div>
                <div className="studyType">2020 → 2022</div>
              </div>
            </section>

            <section id="skills">
              <div className="about-title">
                <h2>Skills</h2>
              </div>
              <div className="row">
                <div className="column">
                  <div className="name">
                    <h4>Systems Administration</h4>
                  </div>
                  <ul className="keywords">
                    <li>Linux</li>
                    <li>DNS</li>
                    <li>Security</li>
                  </ul>
                </div>
                <div className="column">
                  <div className="name">
                    <h4>Programming</h4>
                  </div>
                  <ul className="keywords">
                    <li>HTML + CSS</li>
                    <li>Vue + Nuxt.js</li>
                    <li>Git CI/CD</li>
                  </ul>
                </div>
                <div className="column">
                  <div className="name">
                    <h4>Support</h4>
                  </div>
                  <ul className="keywords">
                    <li>ZenDesk</li>
                    <li>Phone Systems (3CX)</li>
                    <li>GSuite/Office 365</li>
                  </ul>
                </div>
                <div className="column">
                  <div className="name">
                    <h4>Other</h4>
                  </div>
                  <ul className="keywords">
                    <li>Sound</li>
                    <li>Live Streaming</li>
                    <li>Stage Setup + Tear Down</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="languages">
              <div className="about-title">
                <h2>Languages</h2>
              </div>
              <div className="row">
                <div className="column">
                  <div className="language">
                    <strong>English</strong>
                  </div>
                  <div className="fluency">Native speaker</div>
                </div>
                <div>
                  <div className="column">
                    <div className="language">
                      <strong>Russian</strong>
                    </div>
                    <div className="fluency">Currently learning</div>
                  </div>
                </div>
                </div>
              </section>

                <section id="interests">
                  <div className="about-title">
                    <h2>Interests</h2>
                  </div>
                  <div>
                    <div>
                      <div className="column">
                        <div className="name">
                          <h4>Photography</h4>
                        </div>
                        <ul className="keywords">
                          <li>Camera</li>
                          <li>Lighting</li>
                          <li>Exploration</li>
                        </ul>
                      </div>
                      <div className="column">
                        <div className="name">
                          <h4>Audiophile</h4>
                        </div>
                        <ul className="keywords">
                          <li>Vinyl</li>
                          <li>Tube Amps</li>
                          <li>Headphones</li>
                        </ul>
                      </div>
                      <div className="column">
                        <div className="name">
                          <h4>Home Lab</h4>
                        </div>
                        <ul className="keywords">
                          <li>Self-Hosting</li>
                          <li>Docker</li>
                          <li>Kubernetes</li>
                        </ul>
                      </div>
                      <div className="column">
                        <div className="name">
                          <h4>Gaming</h4>
                        </div>
                        <ul className="keywords">
                          <li>Overwatch</li>
                          <li>Minecraft</li>
                          <li>Call of Duty</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
          </body>
        </main>
      </Layout>
    </>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
