import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Section,
  Container,
  Title,
  Subtitle,
  Button,
  Icon,
  Column,
  Columns,
  Box,
} from "bloomer"


const Posts = ({ data }) => (
  <Layout>
    <Section>
      <Container>
        <SEO title="Posts" keywords={[`gatsby`, `application`, `react`]} />
        <ul style={{ listStyle: "none" }}>
          {data.allWordpressPost.edges.map(post => (
            <li style={{ padding: "20px 0", borderBottom: "1px solid #ccc" }}>
              <Link
                to={`/post/${post.node.slug}`}
                style={{ display: "flex", color: "black", textDecoration: "none" }}
              >
                <Img
                  sizes={post.node.featured_media.localFile.childImageSharp.sizes}
                  alt={post.node.title}
                  style={{ width: "25%", marginRight: 20 }}
                />
                <div style={{ width: "75%" }}>
                  <h3
                    dangerouslySetInnerHTML={{ __html: post.node.title }}
                    style={{ marginBottom: 0 }}
                  />
                  <p style={{ margin: 0, color: "grey" }}>
                    Written by {post.node.author.name} on {post.node.date}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  </Layout>
)

export default Posts

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          author {
            name
          }
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1200){
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`