import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Section,
  Container,
  Columns,
  Column,
  Button,
  Box,
} from "bloomer"
import MailingList from "../mailchimp/mailing-list"
import { FcGallery } from "react-icons/fc"

const IndexPage = ({ data }) => {
  const page = data.site.siteMetadata
  return (
      <Layout>
        <SEO title="Home" />
        {/* <Hero siteTitle={page.title} description={page.description} /> */}
        <Section className="mailing-list has-white-text">
          <Container>
            <Columns>
              <Column isSize='1/3'>  
                  <img src="https://via.placeholder.com/350x225"/>
              </Column>
              <Column>
                <MailingList/>
              </Column>
            </Columns>
          </Container>
        </Section>
        <Section>
          <Container>
            <Columns>
            <Column isCentered isSize='1/3'>  
                <Box className="content-centered">
                  <FcGallery size={80}/>
                    <h2>null for beginners</h2>
                    <p>This is a paragraph</p>
                  <Button isColor="primary">Get started</Button>
                </Box>
              </Column>
              
              <Column isSize='1/3'>
                <Box className="content-centered">
                  <FcGallery size={80}/>
                    <h2>null care guides</h2>
                    <p>This is a paragraph</p>
                  <Button isColor="primary">Get started</Button>
                </Box>
              </Column>

              <Column isSize='1/3'>
                <Box className="content-centered">
                  <FcGallery size={80}/>
                    <h2>null essential tools</h2>
                    <p>This is a paragraph</p>
                  <Button isColor="primary">Get started</Button>
                </Box>
              </Column>
            </Columns>
          </Container>
        </Section>
      </Layout>
  )
}

IndexPage.propTypes = {
  site: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }),
}
export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
