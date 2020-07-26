import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostCard from './PostCard';
import { useQuery } from '@apollo/react-hooks';


// This is the query that Apollo Client will send to the WP site.
const PostsQuery = gql`
  query GET_PAGINATED_POSTS(
    $searchQuery: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    posts(where: { search: $searchQuery }, first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
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

// Function to update the query with the new results
const updateQuery = (previousResult, { fetchMoreResult }) => {
  return fetchMoreResult.posts.edges.length ? fetchMoreResult : previousResult;
};

const PostsList = ({searchQuery, data, error, loading, fetchMore }) => (
  <Query query={PostsQuery} variables={{ searchQuery, first, after, last, before }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;
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