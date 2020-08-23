import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Location } from '@reach/router';
import moment from 'moment';
import { Link } from 'gatsby';
import { Progress } from "bloomer"

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
        replies {
            edges {
                node {
                    content
                    commentId
                    date
                    author {
                        node {
                            name
                            url
                        }
                    }
                }
            }
        }
        author {
            node {
                name
                url
            }
        }
    }
`;

// Main component class.
class CommentList extends React.Component {
    
    // Render stuff.
    render() {
        const postId = this.props.postId;

        // Helper function for formatting dates with MomentJS.
        const formatDate = date => moment(date).format('MMMM Do, YYYY [at] h:mma')

        // Helper function to generate location.
        const generateCommentLink = (commentId, commentDate) => (
            <Location>
              {({ location }) => (
                <Link to={`${location.pathname}/#comment-${commentId}`}>{formatDate(commentDate)}</Link>
              )}
            </Location>
          )

        // Helper function for generating each comment.
        const generateComment = (comClass, comId, authUrl, authName, comDate, comContent) => (
            <div className={comClass} id={`comment-${comId}`}>
                <div className="comment-author">
                    <a href={authUrl}>{authName}</a> says:<br/> 
                    {generateCommentLink(comId, comDate)}
                </div>
                <div className="comment-content" dangerouslySetInnerHTML={{ __html: comContent }} />
            </div>
        )

        return (
            // Wrap the comment list in our query.
            <Query query={commentQuery} variables={{ postId }}>
                {({ loading, error, data }) => {

                    // Loading and error messages.
                    if (loading) return <Progress isColor='primary' isSize='small' max={100} />
                    if (error) return 'Error loading comments...'; 

                    // If comments don't exist, then don't attempt to display them (prevents undefined error).
                    if (data.comments.nodes.length < 1) return false;

                    return (	
                        // Display the comment list.
                        <div className="comment-list">
                            <h3><strong>Comments</strong></h3>
                            {data.comments.nodes.map((d, idx) => (
                                <div className="comment-container" key={idx}>
                                    
                                    {/* Render parent comment. */}
                                    {generateComment(
                                      "parent-comment", 
                                      d.commentId, 
                                      d.author.node.url, 
                                      d.author.node.name, 
                                      d.date, 
                                      d.content)}
                                    {console.log(d.replies.edges)}
                                    {/* Render child/nested comment. */}
                                    {(d.replies.edges.length >= 1) ?
                                      d.replies.edges.map((c, icx) => (

                                    generateComment(
                                      "child-comment", 
                                      c.node.commentId, 
                                      c.node.author.node.url, 
                                      c.node.author.node.name, 
                                      c.node.date, 
                                      c.node.content)
                                      ))
                                    : false}
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