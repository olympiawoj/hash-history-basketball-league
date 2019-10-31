import React, { Component } from "react"
import Sidebar from "./Sidebar"
import { Route, Link } from "react-router-dom"
import { getPlayers } from "../api"
import { parse } from "query-string"
import slug from "slug"

//Grab players & render sidebar component, passing it the players list
export default class Players extends Component {
    state = {
        players: [],
        loading: true
    }

    componentDidMount() {
        //Prop we're getting from react-router
        const { location } = this.props
        //if this location has a query parameter to it, players we want to get are only players on bulls
        //if /players and noq uery parameters, render all players
        location.search
            ? this.fetchPlayers(parse(location.search).teamId) : this.fetchPlayers()
    }

    fetchPlayers = (teamId) => {
        getPlayers(teamId)
            .then((players) => this.setState(() => ({
                loading: false,
                players
            })))
            .catch(error => console.log('Error fetching players'))
    }
    render() {

        const { players, loading } = this.state
        const { match, location } = this.props

        return (
            <div className="container two-column">
                {/* {JSON.stringify(this.state)} */}
                <Sidebar
                    loading={loading}
                    title="Players"
                    list={players.map((player) => player.name)} {...this.props} />

                {/* If user hasn't selected player yet, render text */}
                {loading === false && location.pathname === '/players' ?
                    <div className='sidebar-instruction'>Select a player</div>
                    : null}
            </div>
        )
    }
}