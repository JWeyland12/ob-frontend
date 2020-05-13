import React from "react"
import PostsList from '../search/PostsList'
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
          <PostsList searchQuery={''} />  
      </Container>
    </Section>
  </Layout>
)

export default AllPosts