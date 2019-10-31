import React, { Component } from "react"
import Sidebar from "./Sidebar"
import { Route } from "react-router-dom"
import { getTeamsArticles } from "../api"

export default class Articles extends Component {
    state = {
        loading: true,
        teamsArticles: []
    }

    componentDidMount() {
        debugger;
        getTeamsArticles(this.props.match.params.teamId)
            .then((teamsArticles) => {
                // let articleNames = teamsArticles.map((article) => article.title)
                // console.log(articleNames)
                this.setState(() => ({
                    loading: false,
                    teamsArticles: teamsArticles.map((article) => article.title),
                }))
            })
            .catch(error => console.log("Error getting team articles"))
    }

    render() {
        const { loading, teamsArticles } = this.state
        const { params, url } = this.props.match
        const { teamId } = params

        return loading === true ?
            <h1>LOADING</h1> :
            <div className="container two-column">
                <Sidebar loading={loading} title="Articles" list={teamsArticles} {...this.props} />
            </div>
    }
}

