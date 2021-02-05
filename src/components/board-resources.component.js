import React, { Component } from "react";

import ResourceService from "../services/resource.service";

import { Link } from "react-router-dom";

export default class BoardResources extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            resources: [],
            page: 1
        };

        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        ResourceService.getResources(this.state.page).then(
            response => {
                this.setState({
                    content: response.data,
                    resources: response.data.data
                });
            },
            error => {
                this.setState({
                resources:
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

        ResourceService.getResources(this.state.page).then(
            response => {
                this.setState({
                    content: response.data,
                    resources: response.data.data
                });
            },
            error => {
                this.setState({
                resources:
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

        ResourceService.getResources(this.state.page).then(
            response => {
                this.setState({
                    content: response.data,
                    resources: response.data.data
                });
            },
            error => {
                this.setState({
                resources:
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
                    <h1>Resources</h1>
                    <div className="flex">
                        {this.state.resources.length &&
                            this.state.resources.map((resource) => {
                                return (
                                    <div key={resource.id}>
                                        <p>
                                            Name: <strong>{resource.name}</strong>
                                        </p>
                                        <p>
                                            Year: {resource.year}
                                        </p>
                                        <p style={{color: resource.color}}>
                                            Color: {resource.color}
                                        </p>
                                        <Link to={{
                                            pathname: '/resource/',
                                            resourceId: resource.id
                                        }}>
                                            <div style={{backgroundColor: resource.color, height: "50px", width: "50px", margin: "0 auto"}}>
                                                
                                            </div>
                                        </Link>
                                        <p>
                                            Pantone Value: {resource.pantone_value}
                                        </p>

                                        {/** 
                                        <Link to={{
                                            pathname: '/profile/',
                                            userId: user.id
                                        }}>
                                            <img key={user.avatar} src={user.avatar} />
                                        </Link>
                                        */}

                                        
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