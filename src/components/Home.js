import React, { Component } from "react"
import TeamLogo from "./TeamLogo"
import { Link } from "react-router-dom"
import { getTeamNames } from "../api"

export default class Home extends Component {
    state = {
        teamNames: []
    }
    //fetch teams using getTeamNames, add to state which will cause a re-render

    componentDidMount() {
        getTeamNames()
            .then((teamNames) => this.setState(() => ({
                teamNames
            })))
            .catch((error) => console.log('error'))
    }
    render() {
        const { teamNames } = this.state
        return (
            <div className="container">
                <h1 className="large-header">
                    Hash History Basketball League
                </h1>
                <h3 className="header text-center">
                    Select a team
                </h3>
                <div className="home-grid">
                    {teamNames.map((id) => (
                        <Link key={id} to={`/${id}`}>
                            <TeamLogo id={id} width='125px'></TeamLogo>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}