import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { 
  FaYoutube, 
  FaFacebook, 
  FaPinterest, 
  FaTwitter, 
  FaInstagram 
} from 'react-icons/fa';
import {
  Section,
  Container,
  Column,
  Columns,
  Box,
  Icon,
} from "bloomer"

const BlogPostTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPost.title}
      description={data.wordpressPost.excerpt}
    />
    <Section className="has-background-white">
      <Container>
        <Columns>
          <Column isSize='2/3'>
            <h1>{data.wordpressPost.title}</h1>
            <p>
              Written by {data.wordpressPost.author.name} on {data.wordpressPost.date}
            </p>
            <Img
              sizes={data.wordpressPost.featured_media.localFile.childImageSharp.sizes}
              alt={data.wordpressPost.title}
              style={{ maxHeight: 450 }}
            />
            <div
              style={{ marginTop: 20 }}
              dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
            />
          </Column>
            <Column hasTextAlign='centered' isOffset='8' isColor='danger'>
            <FaYoutube isSize="medium" className="fa-2x" style={{ margin: '10px', color: '#ff0000' }} />
            <FaFacebook isSize="medium" className="fa-2x" style={{ margin: '10px', color: '#3b5998' }} />
            <FaPinterest isSize="medium" className="fa-2x" style={{ margin: '10px', color: '#b31217' }} />
            <FaTwitter isSize="medium" className="fa-2x" style={{ margin: '10px', color: '#55acee' }} />
            <FaInstagram isSize="medium" className="fa-2x" style={{ margin: '10px', color: '#f10176' }} />
              <Box>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              </Box>
              <Box>
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
              </Box>
              <Box>
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.
              </Box>

            </Column>
        </Columns>
      </Container>
    </Section>
  </Layout>
)
export default BlogPostTemplate

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
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
`