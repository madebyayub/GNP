import React from "react";
import './settings.css';
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar";

const defaultState = {
  // Fields
  first_name: "",
  last_name: "",
  email: "",
  password: "",

  // Error message
  error_msg: "",
  first_name_error: "",
  last_name_error: "",
  email_error: "",
  password_error: "",
}

class Settings extends React.Component {

  state = {
    // Fields
    first_name: "",
    last_name: "",
    email: "",
    password: "",

    // Error message
    error_msg: "",
    first_name_error: "",
    last_name_error: "",
    email_error: "",
    password_error: "",
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  validateForm = () => {
    let first_name_error = "";
    let last_name_error = "";
    let email_error = "";
    let valid_email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let password_error = "";
    let is_valid = true;

    // Validate first name
    if (this.state.first_name === "") {
      first_name_error = "Please enter your first name";
      is_valid = false;
    }

    // Validate last name
    if (this.state.last_name === "") {
      last_name_error = "Please enter your last name";
      is_valid = false;
    }

    // Validate email
    const email_valid = valid_email_regex.test(this.state.email);
    if (!email_valid) {
      email_error = "Email entered is not valid";
      is_valid = false;
    }

    // Validate password
    if (this.state.password === "") {
      password_error = "Password is invalid";
      is_valid = false;
    }

    if (!is_valid) {
      this.setState({
        first_name_error,
        last_name_error,
        email_error,
        password_error,
      });
    }

    return is_valid;

  }

  formSubmit = (e) => {
    e.preventDefault();
    const form_valid = this.validateForm();

    if (form_valid){
      
    }

    console.log(this.state);
  }

  renderRating() {
    let renderStarsReturn = [];
    for (let i = 0; i < this.props.currentUser.rating; i++) {
      renderStarsReturn.push(<i className="fas fa-star"></i>);
    }
    return renderStarsReturn;
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    console.log(this.state);
  };

  render() {
    if (this.props.currentUser === null) {
      return <Redirect to="/login" />;
    }
    return (
        <div className="settings-container">
        <Navbar />
          <div className="settings-cover"></div>
          
          <div className="user-container">

            <div className="user-curr-info">
              <div className="profile-img">
                <img src={this.props.currentUser.profile_picture}/>
              </div>
              <h3>{this.props.currentUser.first_name} {this.props.currentUser.last_name} </h3>
              <div className="user-ratings">
                {this.renderRating()}
              </div>
              <h4>{this.props.currentUser.email}</h4>
              <div className="requests-info">
                <p>Number of requests made: </p>
                <p>4</p>
              </div>
              <div className="requests-info">
                <p>Number of requests accepted: </p>
                <p>10</p>
              </div>
            </div>

            <div className="user-update-info">
              <h2>Update Information</h2>
              <form className="update-form" onSubmit={this.formSubmit}>
                <p className="error_msg"></p>

                <div className="update-input-container">
                  <label>First Name</label>
                  <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    defaultValue={this.props.currentUser.first_name}
                    onChange={this.handleChange}
                  ></input>
                </div>

                <div className="update-input-container">
                  <label>Last Name</label>
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    defaultValue={this.props.currentUser.last_name}
                    onChange={this.handleChange}
                  ></input>
                </div>

                <div className="update-input-container">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={this.props.currentUser.email}
                    onChange={this.handleChange}
                  ></input>
                </div>

                <div className="update-input-container">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    defaultValue={this.props.currentUser.password}
                    onChange={this.handleChange}
                  ></input>
                </div>

                <div className="update-input-container">
                  <button id="submit" type="buton" onSubmit={this.formSubmit}>
                    Update info
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
    );
  }
}

export default Settings;