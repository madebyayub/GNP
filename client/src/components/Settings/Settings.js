import React from "react";
import "../../stylesheets/settings.css";
import { Redirect } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import UserUpdateForm from "../UserUpdateForm/UserUpdateForm";
import { getUserById } from "../../actions/user";
import { connect } from "react-redux";

class Settings extends React.Component {
  render() {
    const currentUser = this.props.currentUser;
    if (currentUser === null) {
      return <Redirect to="/login" />;
  
    } else if (currentUser.admin === true) {
      return <Redirect to="/admin" />;
      
    }else{

      return (
        <div className="settings-container settings">
          <UserInfo />
          <div className="user-update-container">
            <UserUpdateForm />
          </div>
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { getUserById })(Settings);
