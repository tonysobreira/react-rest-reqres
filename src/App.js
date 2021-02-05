import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Resource from "./components/resource.component";
import BoardUser from "./components/board-user.component";
import BoardUsers from "./components/board-users.component";
import BoardResources from "./components/board-resources.component";

class App extends Component {

    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        token: "",
        user: {
            id: "",
            email: "",
            first_name: "",
            last_name: "",
            avatar: ""
        }
      };
    }

  componentDidMount() {
    const token = AuthService.getToken();

    if (token) {
      this.setState({
        token: token
      });

      UserService.getUser().then(response => {
          this.setState({
              user: response.data
          });
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { token, user} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {token && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <Link to={"/resources"} className="nav-link">
                  Resources
                </Link>
              </li>
            )}
          </div>

          {token ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={{pathname: "/profile/", userId: 4}} className="nav-link">
                  {user.first_name + " " + user.last_name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/resource" component={Resource} />
            <Route path="/user" component={BoardUser} />
            <Route path="/users" component={BoardUsers} />
            <Route path="/resources" component={BoardResources} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;