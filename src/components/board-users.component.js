import React, { Component } from "react";

import UserService from "../services/user.service";

import { Link } from "react-router-dom";

export default class BoardUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            users: [],
            page: 1
        };

        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        UserService.getUsers(this.state.page).then(
            response => {
                this.setState({
                    content: response.data,
                    users: response.data.data
                });
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

    previousPage() {

        this.setState({
            page: this.state.page--
        });

        UserService.getUsers(this.state.page).then(
            response => {
                this.setState({
                    content: response.data,
                    users: response.data.data
                });
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

    nextPage() {

        this.setState({
            page: this.state.page++
        });

        UserService.getUsers(this.state.page).then(
            response => {
                this.setState({
                    content: response.data,
                    users: response.data.data
                });
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

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>page: {this.state.content.page}</h3>
                    <h3>per_page: {this.state.content.per_page}</h3>
                    <h3>total: {this.state.content.total}</h3>
                    <h3>total_pages: {this.state.content.total_pages}</h3>
                </header>
                <div className="App">
                    <h1>Hello ReqRes users!</h1>
                    <div className="flex">
                        {this.state.users.length &&
                            this.state.users.map((user) => {
                                return (
                                    <div key={user.id}>
                                        <p>
                                            <strong>{user.first_name}</strong>
                                        </p>
                                        <p>
                                            {user.email}
                                        </p>
                                        <Link to={{
                                            pathname: '/profile/',
                                            userId: user.id
                                        }}>
                                            <img key={user.avatar} src={user.avatar} alt="avatar" />
                                        </Link>
                                    </div>
                                );
                        })}
                    </div>
                </div>
                <div>
                    <button 
                        className="btn btn-primary"
                        disabled={this.state.content.page < this.state.content.total_pages}
                        onClick={this.previousPage}>
                        Previous Page
                    </button>
                    {" "}
                    <button 
                        className="btn btn-primary"
                        disabled={this.state.content.page === this.state.content.total_pages}
                        onClick={this.nextPage}>
                        Next Page
                    </button>
                </div>
            </div>
        );
    }

}