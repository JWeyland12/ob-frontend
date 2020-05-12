import React from 'react';
import { Link } from "gatsby"
import {
  Section,
  Container,
  Title,
  Subtitle,
  Button,
  Icon,
  Column,
  Columns,
  Box,
  Card,
} from "bloomer"


// Helper function for formatting dates.
const formatDate = date => new Date( date ).toDateString();

const PostCard = ({post}) => {
  const { postId, title, date, excerpt, slug, author, featuredImage } = post;
  const { name: authorName } = author;

//   return (
//     <div key={postId} className="post-card">
//     { featuredImage && // If a featured image exists, display it.
//       <img src={featuredImage.sourceUrl} alt={featuredImage.altText} className="post-card__image" />
//     }
//       <h3 className="post-card__heading">{title}</h3>
//       <span className="post-card__detail">
//         <span className="post-card__label">Date:</span> {formatDate(date)}
//       </span>
//       <span className="post-card__detail">
//         <span className="post-card__label">Author:</span> {authorName}
//       </span>
//     </div>
//   );
// };

// export default PostCard;

return (
	<Box key={postId}>
		<Link
      // to={`/post/${post.node.slug}`}
      to={`/posts/` + slug}
			style={{ color: "black", textDecoration: "none" }}
		>
			<Container>
				<h3 style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: title }} />
				<p style={{ marginBottom: "1em", fontSize: ".9em", color: "grey" }}>Written by {authorName} on {formatDate(date)}</p>
			</Container>
			<Columns isCentered>
				<Column isSize='1/4'>
        { featuredImage && // If a featured image exists, display it.
       <img src={featuredImage.sourceUrl} alt={featuredImage.altText} className="post-card__image" />
        }
				</Column>
				<Column>
					<p className="text-wrap" style={{ textOverflow: "hidden" }} dangerouslySetInnerHTML={{ __html: excerpt }} />
				</Column>
			</Columns>
		</Link>
	</Box>
  )
};

  export default PostCard;