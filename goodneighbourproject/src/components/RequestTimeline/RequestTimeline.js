import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";
import PostModal from "./PostModal";

class RequestTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPosts: null,
      posts: this.props.posts_state.posts,
      confirmationModal: {
        display: false,
        selectedPost: null,
      },
      currentPage: 1,
      postsPerPage: 5,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ filteredPosts: this.props.posts_state.posts });
  }

  filterPosts(posts) {
    return this.props.filterPosts(
      this.props.posts_state.posts,
      this.props.posts_state
    );
  }

  addPostToState = (post) => {
    this.props.addPostToState(this.props.posts_state, post);
  };

  handleConfirmationModal = (post) => {
    this.setState({ confirmationModal: { display: true, selectedPost: post } });
  };

  handleCloseModal = () => {
    this.setState({
      confirmationModal: { display: false, selectedPost: null },
    });
  };

  handleAcceptPost = (post) => {
    this.handleCloseModal();
    const updated_user = {
      ...this.props.users_state.currentUser,
      active_post: post,
    };
    this.props.deletePost(this.props.posts_state, post.id);
    this.props.updateUser(this.props.users_state, updated_user);
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    if (this.state.filteredPosts != null) {
      const { posts, currentPage, postsPerPage } = this.state;
      const filteredPosts = this.filterPosts(posts);
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = filteredPosts.slice(
        indexOfFirstPost,
        indexOfLastPost
      );

      const renderPosts = currentPosts.map((post, index) => {
        return (
          <RequestPost
            showConfirmation={this.handleConfirmationModal}
            deletePost={this.props.deletePost}
            editPost={this.props.editPost}
            currentUser={this.props.users_state.currentUser}
            users_state={this.props.users_state}
            key={index}
            post={post}
            posts_state={this.props.posts_state}
          />
        );
      });

      const pageNumbers = [];
      for (
        let i = 1;
        i <= Math.ceil(filteredPosts.length / postsPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map((number) => {
        return (
          <li key={number} id={number} onClick={this.handleClick}>
            {number}
          </li>
        );
      });

      return (
        <>
          <div className="timeline">
            <RequestAsk
              currentUser={this.props.users_state.currentUser}
              addPostToState={this.props.addPostToState}
              posts_state={this.props.posts_state}
            />
            <ul className="posts">{renderPosts}</ul>
            <ul id="page-numbers">{renderPageNumbers}</ul>
          </div>
          <PostModal
            users={this.props.users_state.users}
            acceptPost={this.handleAcceptPost}
            confirmation={this.state.confirmationModal}
            closeModal={this.handleCloseModal}
          />
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default RequestTimeline;
