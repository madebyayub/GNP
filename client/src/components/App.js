import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifyWarn } from "../Utils/notificationUtils";

import Home from "./Home/Home";
import Feed from "./Feed/Feed";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Settings from "./Settings/Settings";
import SettingsAdmin from "./SettingsAdmin/SettingsAdmin";

import "../stylesheets/shared.css";


class App extends React.Component {

  /*

  THIS WILL BE STORED IN THE DATABASE
    ------- Users state ----------
    This state keeps track of all the users which WILL BE STORED IN THE DATABSE
    in the later phase.

    currentUserLocation: Keeps track of the location of the user
    currentUser: Keeps track of the currently logged in user
    users: A list of users.
      - id: The id of the user
      - first_name: First name
      - last_name: Last name
      - email: User's email
      - password: User's password
      - rating: The current rating of the user on a scale of 5
      - active_post: If a user has accepted a post, they cannot accept
                    any other posts until they have completed this post.
      - profile_picture: User's profile picture
      - admin: Whether the user is an admin

  */
  state = {
    currentUserLocation: null,
    currentUser: null,
    users: [
      {
        id: 0,
        first_name: "Sam",
        last_name: "Apple",
        email: "user@user.com",
        password: "user",
        rating: 4,
        active_post: null,
        profile_picture:
          "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        admin: false,
      },
      {
        id: 1,
        first_name: "John",
        last_name: "Pole",
        email: "admin@admin.com",
        password: "admin",
        rating: 5,
        active_post: null,
        profile_picture:
          "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70",
        admin: true,
      },

      {
        id: 2,
        first_name: "Robert",
        last_name: "Hartz",
        email: "robert@hartz.com",
        password: "password",
        rating: 3,
        active_post: null,
        profile_picture:
          "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg",
        admin: false,
      },
    ],

    setState: this.setState.bind(this),
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getUserLocation,
        this.displayLocationWarning
      );
    } else {
      alert("Geolocation is not supported on this browser");
    }
  }

  displayLocationWarning = () => {
    notifyWarn(
      "We cannot retrieve your location. This app requires location to be enabled in your browser to function correctly."
    );
  };

  getUserLocation = (position) => {
    this.setState({ currentUserLocation: position.coords });
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Home users_state={this.state} />}
            />
            <Route
              path="/feed"
              component={() => (
                <Feed
                  users_state={this.state}
                />
              )}
            />

            <Route
              exact
              path="/signup"
              component={() => (
                <Signup users_state={this.state} />
              )}
            />

            <Route
              exact
              path="/login"
              component={() => (
                <Login
                  users_state={this.state}
                />
              )}
            />

            <Route
              exact
              path="/logout"
              component={() => (
                <Logout users_state={this.state} />
              )}
            />

            <Route
              exact
              path="/settings"
              component={() => (
                <Settings users_state={this.state} />
              )}
            />

            <Route
              exact
              path="/admin"
              component={() => (
                <SettingsAdmin
                  users_state={this.state}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </>
    );
  }
}

export default App;
