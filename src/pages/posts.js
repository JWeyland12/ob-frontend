import React from "react"
import Posts from '../search/PostsList'
import {
  Section,
  Container,
  Title,
} from "bloomer"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AllPosts = () => (
<Layout>
    <Section>
      <Container>
        <SEO title="Posts" keywords={[`gatsby`, `application`, `react`]} />
          <Title isSpaced>Posts</Title>
          <Posts searchQuery={''} />  
      </Container>
    </Section>
  </Layout>
)

export default AllPosts