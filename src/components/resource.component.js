import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ResourceService from "../services/resource.service";

export default class Resource extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            resource: {
                id: "",
                name: "",
                year: "",
                color: "",
                pantone_value: ""
            }
        };

        console.log(props.location.resourceId);
        this.resourceId = props.location.resourceId;
    }

    componentDidMount() {

        this.setState({
            token: AuthService.getToken()
        });

        if (this.resourceId) {
            ResourceService.getResourceById(this.resourceId).then(response => {
                this.setState({
                    resource: response.data
                });
            });
        }

    }

    render() {
        const { token } = this.state;
        const { resource } = this.state;

        return (
            <div className="container">                
                <header className="jumbotron" style={{backgroundColor: resource.color}}>
                    <h3 style={{color:"white"}}>
                        Resource: <strong>{resource.name}</strong>
                    </h3>
                </header>
                <p>
                    <strong>Id:</strong>{" "}
                    {resource.id}
                </p>
                <p>
                    <strong>Name:</strong>{" "}
                    {resource.name}
                </p>
                <p>
                    <strong>Year:</strong>{" "}
                    {resource.year}
                </p>
                <p>
                    <strong>Color:</strong>{" "}
                    {resource.color}
                </p>
                <p>
                    <strong>Pantone Value:</strong>{" "}
                    {resource.pantone_value}
                </p>
                <p>
                    <strong>Token:</strong>{" "}
                    {token}
                </p>
                
            </div>
        );
    }

}