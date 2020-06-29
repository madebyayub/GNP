import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";

class RequestTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPosts: null,
      posts: [
        {
          id: 1,
          reimbursement: "Cash",
          items: ["Chips", "Apples", "Flour"],
          author: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 2,
          reimbursement: "Cheque",
          items: ["Honey Nut Cheerios"],
          author: 2,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 3,
          reimbursement: "E-transfer",
          items: ["Drawer", "Brush", "Canvas", "Lamp", "Blouse"],
          author: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 4,
          reimbursement: "Cash",
          items: [
            "Boat",
            "Frame",
            "Clamp",
            "Cell Phone",
            "Fridge",
            "Drill",
            "Puddle",
            "Couch",
          ],
          author: 2,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 2,
          reimbursement: "E-transfer",
          items: [
            "Wagon",
            "Stop Cream",
            "Thermometer",
            "Shoes",
            "Pillow",
            "Milk",
            "Radio",
            "Towel",
            "PS4",
            "Clock",
          ],
          author: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 2,
          reimbursement: "Cheque",
          items: ["Blue Blanket", "Red Blanket", "Orange Blanket"],
          author: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 2,
          reimbursement: "Cheque",
          items: ["24 pc Water", "Crackers", "Apple pie", "Cake"],
          author: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
      ],
      currentPage: 1,
      postsPerPage: 5,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ filteredPosts: this.state.posts });
  }

  sizeEstimate = (post) => {
    let size = null;
    if (post.items.length <= 3) {
      size = "small";
    } else if (post.items.length <= 8) {
      size = "medium";
    } else {
      size = "large";
    }
    return size;
  };

  filterPosts() {
    let newFilteredPosts = [...this.state.posts];
    if (
      this.props.filterState.filterPayment !== null &&
      this.props.filterState.filterPayment !== "any"
    ) {
      // Filter by payment
      newFilteredPosts = this.state.posts.filter((post) => {
        return (
          this.props.filterState.filterPayment ===
          post.reimbursement.toLowerCase()
        );
      });
    }
    if (
      this.props.filterState.filterSize !== null &&
      this.props.filterState.filterSize !== "any"
    ) {
      // Filter by request size
      newFilteredPosts = newFilteredPosts.filter((post) => {
        return (
          !this.props.filterState.filterSize ||
          this.props.filterState.filterSize === this.sizeEstimate(post)
        );
      });
    }
    return newFilteredPosts;
  }

  addPostToState = (post) => {
    this.setState({ posts: [...this.state.posts, post] });
  };

  handleEditPost = (id, post) => {
    let newPosts = this.state.posts;
    for (let i = 0; i < newPosts.length; i++) {
      if (newPosts[i].id === id) {
        newPosts[i].description = post.description;
        newPosts[i].items = post.items;
        newPosts[i].reimbursement = post.reimbursement;
        break;
      }
    }
    this.setState({ posts: newPosts });
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
            editPost={this.handleEditPost}
            currentUser={this.props.users_state.currentUser}
            users={this.props.users_state.users}
            key={index}
            post={post}
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
        <div className="timeline">
          <RequestAsk
            currentUser={this.props.users_state.currentUser}
            addPostToTimeline={this.addPostToState}
          />
          <ul className="posts">{renderPosts}</ul>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default RequestTimeline;
