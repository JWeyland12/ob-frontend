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

// Component that shoes the paginated list of posts
const PostList = ({ searchQuery, data, error, loading, fetchMore }) => {
  const { posts } = data;
  return (
    <div>
      <h2>Post List</h2>
      {posts && posts.edges ? (
        <div>
          <ul>
            {posts.edges.map(edge => {
              const { node } = edge;
              return (
                <li
                  key={node.postId}
                  dangerouslySetInnerHTML={{ __html: node.title }}
                />
              );
            })}
          </ul>
          <div>
            {posts.pageInfo.hasPreviousPage ? (
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      searchQuery: 'h',
                      first: null,
                      after: null,
                      last: 1,
                      before: posts.pageInfo.startCursor || null
                    },
                    updateQuery
                  });
                }}
              >
                Previous
              </button>
            ) : null}
            {posts.pageInfo.hasNextPage ? (
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      searchQuery: 'h',
                      first: 1,
                      after: posts.pageInfo.endCursor || null,
                      last: null,
                      before: null
                    },
                    updateQuery
                  });
                }}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div>No posts were found...</div>
      )}
    </div>
  );
};

const Posts = () => {
  const variables = {
    searchQuery: 'h',
    first: 1,
    last: null,
    after: null,
    before: null
  };
  const { data, error, loading, fetchMore } = useQuery(PostsQuery, {
    variables
  });

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  if (loading) {
    return null;
  }

  return (
    <PostList
      error={error}
      loading={loading}
      data={data}
      fetchMore={fetchMore}
    />
  );
};

export default () => <Posts />;
