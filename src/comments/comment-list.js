import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Location } from '@reach/router';
import moment from 'moment';
import { Link } from 'gatsby';

// Create a GraphQL query for the comment list.
const commentQuery = gql`
    query($postId: ID!) {
        comments(where: { contentId: $postId, contentStatus: PUBLISH }) {
            nodes {
                ...CommentFields
            }
		}
    }

    fragment CommentFields on Comment {
		content
        commentId
        date
        author {
            ...AuthorFields
        }
	}

    fragment AuthorFields on CommentAuthor {
        name
        url
	}
`;

// Main component class.
class CommentList extends React.Component {
    
    // Render stuff.
    render() {
        const postId = this.props.postId;

        // Helper function for formatting dates with MomentJS.
        const formatDate = date => moment(date).format('MMMM Do, YYYY [at] h:mm:ss a')

        // Helper function to generate location.
        const generateCommentLink = (commentId, commentDate) => (
            <Location>
              {({ location }) => (
                <Link to={`${location.pathname}/#comment-${commentId}`}>{formatDate(commentDate)}</Link>
              )}
            </Location>
          )

        return (
            // Wrap the comment list in our query.
            <Query query={commentQuery} variables={{ postId }}>
                {({ loading, error, data }) => {
                    // Loading and error messages.
                    if (loading) return 'Loading comments...';
                    if (error) return 'Error loading comments...';

                    // Display message if there are no comments to show.
                    if (data.comments.nodes.length < 1) return 'This post does not have any comments.';

                    return (	
                        // Display the comment list.
                        <div className="comment-list">
                            {data.comments.nodes.map((comment, idx) => (
                                <div id={`comment-${comment.commentId}`} key={idx} className="comment">
                                    <div className="comment-author">
                                        <a href={comment.author.url}>{comment.author.name}</a> says:<br/> 
                                        {generateCommentLink(comment.commentId, comment.date)}
                                    </div>
                                    <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
                                </div>
                            ))}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default CommentList;