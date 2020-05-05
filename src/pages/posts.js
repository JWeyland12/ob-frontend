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
          <Title isSpaced>Recent Posts</Title>
          {data.allWordpressPost.edges.map(post => (
            <Box>
               <Link
                    to={`/post/${post.node.slug}`}
                    style={{ display: "flex", color: "black", textDecoration: "none" }}
                  >
              <Columns isCentered>
                <Column isSize='1/3'>
                    <Img sizes={post.node.featured_media.localFile.childImageSharp.sizes} />
                </Column>
                <Column>
                  <h3 dangerouslySetInnerHTML={{ __html: post.node.title }} />
                  <p>Written by {post.node.author.name} on {post.node.date}</p>
                  <p className="text-wrap" style={{ textOverflow: "hidden" }} dangerouslySetInnerHTML={{ __html: post.node.excerpt.substr(0, 500) }} />
                </Column>
              </Columns>
              </Link>
            </Box>
          ))}
        
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
                sizes(maxWidth: 512){
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