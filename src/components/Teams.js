import React, { Component } from "react"
import Sidebar from "./Sidebar"
import { getTeamNames } from "../api"

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
            </div>
        )
    }
}