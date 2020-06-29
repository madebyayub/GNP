import React from "react";
import './userinfo.css';

class UserInfo extends React.Component{

  renderRating() {
    let renderStarsReturn = [];
    for (let i = 0; i < this.props.currentUser.rating; i++) {
      renderStarsReturn.push(<i className="fas fa-star"></i>);
    }
    return renderStarsReturn;
  }

  render(){
    const currentUser = this.props.currentUser;

    return(
      <div className="user-curr-info">
        <div className="profile-img">
          <img src={currentUser.profile_picture}/>
        </div>
        <h3>{currentUser.first_name} {currentUser.last_name} </h3>
        <div className="user-ratings">
          {this.renderRating()}
        </div>
        <h4>{currentUser.email}</h4>
        <div className="requests-info">
          <p>Number of requests made: </p>
          <p>4</p>
        </div>
        <div className="requests-info">
          <p>Number of requests accepted: </p>
          <p>10</p>
        </div>
      </div>
    )
  }
}

export default UserInfo;