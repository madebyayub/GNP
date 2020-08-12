import React, { useState } from "react";
import "../../stylesheets/settingsAdmin.css";
import CreateAdmin from "./CreateAdmin";
import ViewUsers from "./ViewUsers";
import AppStats from "./AppStats";
import UserInfo from "../UserInfo/UserInfo";
import UserUpdateForm from "../UserUpdateForm/UserUpdateForm";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import { getUserById, getAllUsers } from "../../actions/user";

const SettingsAdmin = (props) => {
  const adminOptions = {
    VIEW_USERS: "View Users",
    APP_STATS: "App Stats",
    UPDATE_INFO: "Update Info",
  };

  const [adminOption, setAdminOption] = useState(adminOptions.VIEW_USERS);
  let SelectedOption = null;

  switch (adminOption) {
    case adminOptions.CREATE_ADMIN:
      SelectedOption = CreateAdmin;
      break;
    case adminOptions.VIEW_USERS:
      SelectedOption = ViewUsers;
      break;
    case adminOptions.APP_STATS:
      SelectedOption = AppStats;
      break;
    case adminOptions.UPDATE_INFO:
      SelectedOption = UserUpdateForm;
      break;
    default:
      break;
  }

  const currentUser = props.currentUser;
  if (currentUser === null) {
    return <Redirect to="/login" />;
  }else if(!currentUser.admin){
    return <Redirect to="/settings" />;
  }

  return (
    <div className="settings-container slide">
      <UserInfo />
      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <h3>Admin Dashboard</h3>
        </div>
        <div className="tab-container">
          <button
            className={`admin-tab ${
              adminOption === adminOptions.VIEW_USERS ? "active" : ""
            }`}
            onClick={() => setAdminOption(adminOptions.VIEW_USERS)}
          >
            View Users
          </button>
          <button
            className={`admin-tab  ${
              adminOption === adminOptions.APP_STATS ? "active" : ""
            }`}
            onClick={() => setAdminOption(adminOptions.APP_STATS)}
          >
            App Stats
          </button>
          <button
            className={`admin-tab ${
              adminOption === adminOptions.UPDATE_INFO ? "active" : ""
            }`}
            onClick={() => setAdminOption(adminOptions.UPDATE_INFO)}
          >
            Personal Settings
          </button>
        </div>
       <div className="content">
          {adminOption && (
            <SelectedOption
              // users_state={props.users_state}
              // users={getAllUsers().then((users)=> {return users})}
              // adminClass="admin-class"
              // posts_state={props.posts_state}

            />
          )}
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { getUserById })(SettingsAdmin);