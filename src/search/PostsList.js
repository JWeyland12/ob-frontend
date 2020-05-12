import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostCard from './PostCard';


// This is the query that Apollo Client will send to the WP site.
const POSTS_SEARCH_QUERY = gql`
  query POSTS_SEARCH_QUERY($searchQuery: String!) {
    posts(where: { search: $searchQuery }) {
      edges {
        node {
          postId
          title
          date
          excerpt
          slug
          author {
            name
          }
          featuredImage {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const PostsList = ({searchQuery}) => (
  <Query query={POSTS_SEARCH_QUERY} variables={{ searchQuery }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (!data.posts.edges.length) return <p>No matching posts found.</p>;

      return data.posts.edges.map(edge => {
        const { node: post } = edge;
        const { postId } = post;

        return (
          <PostCard key={postId} post={post} />
        );
      });
    }}
  </Query>
);

export default PostsList;

{/* <Layout>
<Section>
  <Container>
    <SEO title="Posts" keywords={[`gatsby`, `application`, `react`]} />
      <Title isSpaced>Recent Posts</Title>
      {data.allWordpressPost.edges.map(post => (
        <Box>
          <Link
            to={`/post/${post.node.slug}`}
            style={{ color: "black", textDecoration: "none" }}
           >
            <Container>
              <h3 style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: post.node.title }} />
              <p style={{ marginBottom: "1em", fontSize: ".9em", color: "grey" }}>Written by {post.node.author.name} on {post.node.date}</p>
            </Container>
            <Columns isCentered>
              <Column isSize='1/4'>
                <Img sizes={post.node.featured_media.localFile.childImageSharp.sizes} />
              </Column>
              <Column>
                <p className="text-wrap" style={{ textOverflow: "hidden" }} dangerouslySetInnerHTML={{ __html: post.node.excerpt.substr(0, 200) + ' [...]' }} />
              </Column>
            </Columns>
          </Link>
        </Box>
      ))}
  </Container>
</Section>
</Layout>
) */}