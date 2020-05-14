import React from "react"
import PostsSearch from '../search/PostsSearch'
import {
  Section,
  Container,
  Title,
} from "bloomer"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Search = () => (
<Layout>
    <Section>
      <Container>
        <SEO title="Posts" keywords={[`gatsby`, `application`, `react`]} />
          <Title isSpaced>Search</Title>
          <PostsSearch />     
      </Container>
    </Section>
  </Layout>
)

export default Search
