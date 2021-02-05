import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            user: {},
            res: ""
        };

    }

    componentDidMount() {
        this.setState({
            content: UserService.getPublicContent()
        });

        if (this.props.location.state) {
            this.setState({
                user: this.props.location.state.user,
                res: JSON.parse(this.props.location.state.res)
            });
        }
    }

    render() {
        const { user } = this.state;
        const { res } = this.state;
        console.log(res);

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>

                {this.state.user.id && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            <p>User {user.first_name + " " + user.last_name} Deleted</p>
                            <p>HTTP Status {res.status}</p>
                        </div>
                    </div>
                )}

            </div>

        );
    }
    
}