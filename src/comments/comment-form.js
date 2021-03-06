import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Field, Label, Control, Input, Button, TextArea} from "bloomer"

// Create a GraphQL mutation for comment submissions
const commentSubmitQuery = gql`
	mutation($author: String, $commentOn: Int, $parent: ID, $content: String, $authorEmail: String, $authorUrl: String) {
		createComment(
			input: {
				clientMutationId: "CreateComment"
				author: $author
				commentOn: $commentOn
				parent: $parent
				content: $content
				authorEmail: $authorEmail
				authorUrl: $authorUrl
			}
		) {
			success
		}
	}
`;

// Our main component class
class CommentForm extends React.Component {
	constructor(props) {
    super(props);

    // Bind input changes
		this.handleInputChange = this.handleInputChange.bind(this);
    
		// Set the initial state
		this.state = {
			commentStatus: false,
			post: props.postId,
			parent: props.parent,
			comment: '',
			author: '',
			email: '',
			url: '',
		};
	}

	// Handles input change events
	handleInputChange(event) {
		const target = event.target;
		const value = event.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		// Sets the state of the input field
		this.setState({
			[name]: value,
		});
	}

	// Renders the comment form elements
	renderCommentForm() {
		return (
			// Wrap it in our mutation
			<Mutation
				mutation={commentSubmitQuery}
				// Set completion state
				onCompleted={() => {
					this.setState({ commentStatus: 'success' });
				}}
				// Set error state
				onError={() => {
					this.setState({ commentStatus: 'error' });
				}}
			>
				{(addComment) => (
					// Render the form
					<form className="comment-form"
						onSubmit={(event) => {
							// Prevent default form submit behavior
							event.preventDefault();
							// Set initial loading state on submission
							this.setState({ commentStatus: 'loading' });
							// Run the mutation
							addComment({
								variables: {
									author: this.state.author,
									commentOn: this.state.post,
									parent: this.state.parent,
									content: this.state.comment,
									authorEmail: this.state.email,
									authorUrl: this.state.url,
								},
							});
						}}
					>
						<h3><strong>Leave a Reply</strong></h3>
					<p>Your email address will not be published.  Required fields are marked *</p>
						<Field>
							<Label htmlFor="comment">Comment</Label>
							<Control>
								<TextArea name="comment" value={this.state.comment} onChange={this.handleInputChange} />
							</Control>
						</Field>
						
						<Field>
						<Label htmlFor="author">Name *</Label>
							<Control>
								<Input name="author" value={this.state.author} onChange={this.handleInputChange} />
							</Control>
						</Field>
						
						<Field>
						<Label htmlFor="email">Email *</Label>
							<Control>
								<Input name="email" value={this.state.email} onChange={this.handleInputChange} />
							</Control>
						</Field>

						<Field>
						<Label htmlFor="author">Website</Label>
							<Control>
								<Input name="url" value={this.state.url} onChange={this.handleInputChange}/>
							</Control>
						</Field>
										
						<Field isGrouped>
							<Control>
								<Button name="submit" type="submit" value="Post Comment">Submit</Button>
							</Control>
							<Control>
								<Button isLink onClick={this.props.action}>Cancel</Button>
							</Control>
						</Field>
					</form>
				)}
			</Mutation>
		);
	}

	// Render the comment form
	render() {
		// Check comment status from component state and display messages or form
		switch (this.state.commentStatus) {
			case 'success':
				return 'Your comment has been successfully submitted.';
			case 'loading':
				return 'Please wait. Your comment is being submitted.';
			case 'error':
				return 'There was an error in your submission. Please try again later.';
			default:
				return this.renderCommentForm();
		}
	}
}

export default CommentForm;