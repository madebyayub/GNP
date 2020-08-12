import React from "react";
import { connect } from "react-redux";
import "../../stylesheets/timeline.css";
import Request from "../Request/Request";
import NewRequest from "../NewRequest/NewRequest";
import ConfirmationModal from "./ConfirmationModal";
import Sidebar from "../Sidebar/Sidebar";
import Map from "./Map";
import { acceptPost } from "../../actions/user";

import { filterPosts } from "../../actions/timeline";
import { notifyError } from "../../Utils/notificationUtils";

const keys = {
  key1: "AIzaSyCx3EBDjdwQ4Gb6698FPEWsTB7bNL_o7Ow",
  key2: "AIzaSyARRBVg-xS1QeLJMfoCSeQm5At4Q-E7luU",
};

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    /*

    ------- State Initialization ----------
    
      highlightedPost: This state manages the post to currently highlight within the maps inside the sidebar.
      posts: This state holds the posts lists passed down from the parent component.
      confirmationModal: This state manages whether to display the confirmation modal and is responsible for 
                         passing the post information down to the modal itself.
      currentPage: This state manages the page the current user is viewing, default is set to 1.
      postsPerPage: This state contains the amount of posts per page, default is set to 5.
    
    */
    this.state = {
      showMap: true,
      currentUserLocation: null,
      highlightedPost: null,
      confirmationModal: {
        display: false,
        selectedPost: null,
      },
      currentPage: 1,
      postsPerPage: 5,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getUserLocation);
    } else {
      notifyError("Geolocation is not supported on this browser");
    }
  }

  getUserLocation = (position) => {
    this.setState({ currentUserLocation: position.coords });
  };

  /* Function responsible for returning the filtered posts */
  filterPosts() {
    return filterPosts(this.props.posts, this.props.posts);
  }

  /* This function manages the changes regarding the highlighted post within the map. 
     If a new post is clicked on, it sets that post as the highlighted post in the map. */
  handleHighlightedPostChange = (post) => {
    this.setState({ highlightedPost: post });
  };

  /* Upon clicking accept request, this function manages displaying the modal by changing the confirmation state. */
  handleConfirmationModal = (post) => {
    this.setState({ confirmationModal: { display: true, selectedPost: post } });
  };

  /* This function handles if the confirmation modal needs to be closed. */
  handleCloseModal = () => {
    this.setState({
      confirmationModal: { display: false, selectedPost: null },
    });
  };

  /* Upon confirming, this function is responsible for updating the current users active story attribute
     so that they cannot view the feed, as long as this request is active. 
     
     The request does not get deleted from the list upon accepting currently because our requests are hardcoded
     in the Feed.js component. When the user state changes, the App component rerenders since users is hardcoded
     in App.js. Therefore, the default posts get recreated once Feed rerenders due to it being a child of App.

     This function will require database calls in later phases which will fix our current deleting issue. */
  handleAcceptPost = (post) => {
    this.handleCloseModal();
    this.props.acceptPost(post._id, this.props.currentUser._id);
  };

  /* This function handles the changing of the page */
  handlePageClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  toggleMap = () => {
    this.setState({
      showMap: !this.state.showMap,
    });
  };

  /* If the request list empty due to no requests or filter being to strict,
     this function is responsible for rendering an empty message instead. */
  renderEmptyMessage() {
    return (
      <div className="empty-message">
        No requests exist or match your filter.
      </div>
    );
  }
  renderGoogleMap(filteredPosts) {
    return (
      <div className="google-maps-container">
        <div
          className={`google-maps-section ${this.state.showMap ? "" : "hide"}`}
        >
          <Map
            currentUserLocation={this.state.currentUserLocation}
            resetFeedSelectedPost={this.handleHighlightedPostChange}
            highlightedPost={this.state.highlightedPost}
            active_post={false}
            posts={filteredPosts}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${keys.key2}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
        <div>
          <button className="toggle-map" onClick={this.toggleMap}>
            {this.state.showMap ? "Hide Map" : "Show Map"}
          </button>
        </div>
      </div>
    );
  }

  /* 

  ------- Render function ----------

    This render function renders the correct number of posts depending on the filter state, and 
    the current page state. 

    It renders the Sidebar, followed by the RequestAsk component, and then it maps through the
    correct number posts, and renders the RequestPost component for each post.

    It is also responsible for rendering the PostModal given the state of confirmation.

  */
  render() {
    if (this.props.posts != null) {
      let posts = this.props.posts;
      let { currentPage, postsPerPage } = this.state;
      const filteredPosts = this.filterPosts(posts);
      let indexOfLastPost = currentPage * postsPerPage;
      let indexOfFirstPost = indexOfLastPost - postsPerPage;

      let currentPosts = posts;
      //let currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

      if (currentPage !== 1 && currentPosts.length === 0) {
        currentPage = 1;
        indexOfLastPost = currentPage * postsPerPage;
        indexOfFirstPost = indexOfLastPost - postsPerPage;
        currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
      }

      const renderPosts = currentPosts.map((post, index) => {
        return (
          <Request
            highlightPost={this.handleHighlightedPostChange}
            showConfirmation={this.handleConfirmationModal}
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
        if (number === currentPage) {
          return (
            <li
              className="current-page"
              key={number}
              id={number}
              onClick={this.handlePageClick}
            >
              {number}
            </li>
          );
        } else {
          return (
            <li key={number} id={number} onClick={this.handlePageClick}>
              {number}
            </li>
          );
        }
      });
      return (
        <>
          <Sidebar changeFilterState={this.props.changeFilterState} />
          <div className="timeline">
            {this.renderGoogleMap(currentPosts)}
            <NewRequest currentUser={this.props.currentUser} />
            {currentPosts.length === 0 ? (
              this.renderEmptyMessage()
            ) : (
              <>
                <ul className="posts">{renderPosts}</ul>
                <ul id="page-numbers">{renderPageNumbers}</ul>
              </>
            )}
          </div>
          <ConfirmationModal
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    posts: state.posts.posts,
  };
};

export default connect(mapStateToProps, { acceptPost })(Timeline);
