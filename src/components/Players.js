import React, { Component } from "react"
import Sidebar from "./Sidebar"
import { Route, Link } from "react-router-dom"
import { getPlayers } from "../api"
import { parse } from "query-string"
import slug from "slug"

import { TransitionGroup, CSSTransition } from "react-transition-group"

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
        //if /players and no query parameters, render all players
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

                {/* Render a nested route that renders when path is /players/:id*/}
                <Route path={`${match.url}/:playerId`} render={({ match }) => {
                    if (loading === true) return null

                    const { name, position, teamId, number, avatar, stats, apg, ppg, rpg, spg } = players.find((player) => slug(player.name) === match.params.playerId)

                    return (
                        //className of panel is passed through to element that TransitionGroup creates
                        //3 things we need to pass to CSS transition
                        //1 - key so TG knows which items have left and joined
                        //We have access to location fro this.props
                        //2 - Timeout, which is how slow or fast we want animation to go
                        //3 - className which will be applied to both entering chuldren and leavng children
                        //Then inside index.css, define style

                        <TransitionGroup className="panel">
                            <CSSTransition key={location.key} timeout={250} classNames="fade">
                                <div className="panel">
                                    <img className="avatar" src={`${avatar}`} alt={`${name}'s avatar`}></img>
                                    <h1 className="medium-header">{name}</h1>
                                    <h3 className="header">#{number}</h3>
                                    <div className="row">
                                        <ul className="info-list" style={{ marginRight: 80 }}>
                                            <li> Team
                                        <div>
                                                    <Link to={`/${teamId}`} style={{ color: `#6889a` }}>
                                                        {teamId[0].toUpperCase() + teamId.slice(1)}
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>Position
                                        <div>{position}</div>
                                            </li>
                                            <li>PPG
                                        <div>{ppg}</div>
                                            </li>
                                        </ul>
                                        <ul className="info-list">
                                            <li>APG <div>{apg}</div></li>
                                            <li>SPG <div>{spg}</div></li>
                                            <li>RPG <div>{rpg}</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </CSSTransition>
                        </TransitionGroup>


                    )

                }}></Route>
            </div>
        )
    }
}