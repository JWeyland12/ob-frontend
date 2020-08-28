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
    comments(where: { contentId: $postId, contentStatus: PUBLISH, orderby: COMMENT_DATE, order: ASC }) {
      nodes {
          ...CommentFields
      }
    }
  }
  fragment CommentFields on Comment {
    content
    commentId
    date
    parent {
      node {
        id
      }
    }
    replies(where: { orderby: COMMENT_DATE, order: ASC }) {
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

    const parentCheck = (parent) => {
      if (parent === null) {
        console.log("There are no parent here")
      }
    }

    return (
      // Wrap the comment list in our query.
      <Query query={commentQuery} variables={{ postId }}>
        {({ loading, error, data }) => {
          
          // Loading and error messages.
          if (loading) return <Progress isColor='primary' isSize='small' max={100} />
          if (error) return 'Error loading comments...'; 

          // If comments don't exist, then don't attempt to display them (prevents undefined error).
          if (data.comments.nodes.length < 1) return false;
          if (data.comments.nodes.parent < 1) return false;
          console.log("beep", data.comments)

            return (	
              // Display the comment list.
              <>
                <h3 className="comment-list-header"><strong>Comments</strong></h3>
                <div className="comment-list">
                  <div>
                    
                    {/* Generate parent comments */}
                    {data.comments.nodes.map((d, idx) => (
                      <div className="real-container" key={idx}>
                        {(d.parent === null) ?
                        (generateComment(
                          "parent-comment", 
                          d.commentId, 
                          d.author.node.url, 
                          d.author.node.name, 
                          d.date, 
                          d.content
                          )
                        )
                        : null}
                        
                        {/* Generate child comments */}
                        {((d.parent === null) && (d.replies.edges.length >= 1)) ?
                          d.replies.edges.map((d, idx) => (
                          generateComment(
                            "child-comment", 
                            d.node.commentId, 
                            d.node.author.node.url, 
                            d.node.author.node.name, 
                            d.node.date, 
                            d.node.content
                            )
                          )
                        )
                        : false}
                      </div>
                    ))}
                  </div> 
                </div>  
              </>
            );
          }}
      </Query>
    );
  }
}

export default CommentList;