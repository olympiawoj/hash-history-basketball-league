import React, { Component } from "react"
import Sidebar from "./Sidebar"
import { getTeamNames } from "../api"
import { Route, Link } from "react-router-dom"
import TeamLogo from "./TeamLogo"
import Team from "./Team"
import Loading from "./Loading"

export default class Teams extends Component {
    state = {
        teamNames: [],
        loading: true
    }

    componentDidMount() {
        getTeamNames()
            .then((teamNames) => {
                this.setState(() => ({
                    loading: false,
                    teamNames
                }))
            })
            .catch((error) => console.log("Error fetching teams"))
    }


    render() {
        const { teamNames, loading } = this.state
        const { location, match } = this.props
        return (
            <div className="container two-column" >
                {/* {JSON.stringify(this.state)} */}

                <Sidebar title="Teams" list={teamNames} loading={loading} {...this.props} />

                {/* If user hasn't selected player yet, render text */}
                {loading === false && location.pathname === '/teams' ?
                    <div className='sidebar-instruction'>Select a team</div>
                    : null}

                {/* Here we want to render a nested Route component to Render team info, use match.url for nestd routes*/}
                <Route path={`${match.url}/:teamId`} render={({ match }) => (
                    <div className="panel">
                        <Team id={match.params.teamId} >
                            {(team) => team === null ? <Loading text="Loading Teams"></Loading> : <div style={{ width: '100%' }}>
                                <TeamLogo id={team.id} className="center" />
                                <h1 className="medium-header">{team.name}</h1>
                                <ul className="info-list row">
                                    <li>Established<div>{team.established}</div></li>
                                    <li>Manager<div>{team.manager}</div></li>
                                    <li>Coach<div>{team.coach}</div></li>
                                </ul>
                                <Link className="center btn-main" to={`/${match.params.teamId}`}>{team.name} Team Page</Link>
                            </div>}
                        </Team>
                    </div>
                )}>
                </Route>
            </div>
        )
    }
}