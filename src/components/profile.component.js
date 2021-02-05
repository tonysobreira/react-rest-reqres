import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
           token: "",
           user: {
               id: "",
               email: "",
               first_name: "",
               last_name: "",
               avatar: ""
           },
           res: "",
           job: "zion resident"
        };

        console.log(props.location.userId);
        this.userId = props.location.userId;

        this.deleteUserById = this.deleteUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        this.setState({
            token: AuthService.getToken()
        });

        if (this.userId) {
            UserService.getUserById(this.userId).then(response => {
                this.setState({
                    user: response.data
                });
            });
        } else {
            UserService.getUser().then(response => {
                this.setState({
                    user: response.data
                });
            });
        }        
    }

    deleteUserById(e) {
        e.preventDefault();

        UserService.deleteUserById(this.state.user.id).then(
            response => {
                this.setState({
                    res: response
                });
                this.props.history.push({
                    pathname: '/home',
                    search: '?deleted-user-' + this.state.user.first_name + "-" + this.state.user.last_name,
                    state: {
                        user: this.state.user,
                        res: JSON.stringify(response)
                    }
                });
                window.location.reload();
            },
            error => {
                this.setState({
                users:
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
        );
    }

    updateUser() {
        this.state.user.job = this.state.job;
        console.log(this.state.user);

        UserService.updateUser(this.state.user)
            .then(response => {
                console.log(response);
                this.setState({
                    res: response.data
                });
            });
    }

    render() {
        const { token } = this.state;
        const { user } = this.state;

        return (
            <div className="container">                
                <header className="jumbotron">
                    <h3>
                        <strong>{user.first_name + " " + user.last_name}</strong> Profile
                    </h3>
                </header>
                <p>
                    <img key={user.avatar} src={user.avatar} alt="avatar" />
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {user.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {user.email}
                </p>
                <p>
                    <strong>First Name:</strong>{" "}
                    {user.first_name}
                </p>
                <p>
                    <strong>Last Name:</strong>{" "}
                    {user.last_name}
                </p>
                <p>
                    <strong>Token:</strong>{" "}
                    {token}
                </p>

                <strong><label htmlFor="job">Job:</label></strong>
                <input name="job" type="text" value={this.state.job} onChange={e => this.setState({job: e.target.value})} />

                <button onClick={this.updateUser} className="btn btn-primary">
                    Update
                </button>
                
                <button onClick={this.deleteUserById} className="btn btn-primary">
                    Delete
                </button>

                {this.state.res && (
                    <div className="form-group">
                        <div className="alert alert-success" role="alert">
                            <p>User {user.first_name + " " + user.last_name} Updated</p>
                            <p>
                                job: {this.state.res.job}
                            </p>
                            <p>
                                updatedAt: {this.state.res.updatedAt}
                            </p>
                        </div>
                    </div>
                )}
                
            </div>
        );
    }

}