import React, { Component } from 'react';
import PostsList from './PostsList';
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

class PostsSearch extends Component {
  state = {
    searchQuery: ''
  }

  handleSubmit = event => event.preventDefault();

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { state, handleSubmit, handleInputChange } = this;
    const { searchQuery } = state;

    return (
      <div className="posts-search">
        <form className="posts-search__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="posts-search__search-field"
            name="searchQuery"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for blog posts…"
          />
        </form>
        {searchQuery &&
          <div className="results">
            {/* <Section>
              <Container> */}
                <PostsList searchQuery={searchQuery} />
              {/* </Container>
            </Section> */}
          </div>
        }
      </div>
    );
  }
}

export default PostsSearch;