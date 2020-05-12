import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
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


const Posts = ({ data }) => (
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
)

export default Posts

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          author {
            name
          }
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                sizes(maxWidth: 512){
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`