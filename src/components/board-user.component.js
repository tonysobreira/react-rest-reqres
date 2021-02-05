import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        this.setState({
            content: UserService.getUserBoard()
        });
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }

}