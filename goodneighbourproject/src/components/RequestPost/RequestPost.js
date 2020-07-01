import React from "react";
import RequestPostView from "./RequestPostView";
import RequestPostEdit from "./RequestPostEdit";

import "../../stylesheets/RequestTimeline/requestpost.css";

class RequestPost extends React.Component {
  state = { postUser: null, editState: false };

  componentDidMount() {
    for (let i = 0; i < this.props.users_state.users.length; i++) {
      if (this.props.users_state.users[i].id === this.props.post.author) {
        this.setState({ postUser: this.props.users_state.users[i] });
        break;
      }
    }
  }

  componentDidUpdate() {
    for (let i = 0; i < this.props.users_state.users.length; i++) {
      if (this.props.users_state.users[i].id === this.props.post.author) {
        if (
          this.state.postUser &&
          this.props.users_state.users[i].id !== this.state.postUser.id
        ) {
          this.setState({ postUser: this.props.users_state.users[i] });
        }
        break;
      }
    }
  }

  handleEditClick = () => {
    this.setState({ editState: true });
  };

  handleExitEdit = () => {
    this.setState({ editState: false });
  };

  handleEditPost = (id, post) => {
    this.handleExitEdit();
    this.props.editPost(this.props.posts_state, id, post);
  };

  renderItems = () => {
    return this.props.post.items.map((item, i) => {
      return <li key={i} className="request-item">{item}</li>;
    });
  };

  render() {
    if (this.state.postUser !== null) {
      if (!this.state.editState) {
        return (
          <RequestPostView
            deletePost={this.props.deletePost}
            renderItems={this.renderItems}
            editClick={this.handleEditClick}
            currentUser={this.props.currentUser}
            post={this.props.post}
            postUser={this.state.postUser}
            posts_state={this.props.posts_state}
          />
        );
      } else {
        return (
          <RequestPostEdit
            editPost={this.handleEditPost}
            exitEdit={this.handleExitEdit}
            currentUser={this.props.currentUser}
            post={this.props.post}
            postUser={this.state.postUser}
            posts_state={this.props.posts_state}
          />
        );
      }
    } else {
      return <></>;
    }
  }
}

export default RequestPost;
