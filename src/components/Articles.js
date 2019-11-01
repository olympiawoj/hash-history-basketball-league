import React, { Component } from "react"
import Sidebar from "./Sidebar"
import { Route } from "react-router-dom"
import { getTeamsArticles } from "../api"
import Article from "./Article"
import Loading from "./Loading"

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
            <Loading text="Loading Articles"></Loading> :
            <div className="container two-column">
                <Sidebar loading={loading} title="Articles" list={teamsArticles} {...this.props} />
                {/*Render passed a match prop
                & we want to get info about article with id of match.params.articleId */}
                <Route path={`${url}/:articleId`} render={({ match }) => (
                    <Article articleId={match.params.articleId} teamId={teamId}>
                        {/* Pass article a function & what it'll give us back is an article */}
                        {((article) => !article ?
                            <Loading text="Loading Article"></Loading>
                            : <div className="panel">
                                <article className="article" key="article.id">
                                    <h1 className="header">{article.title}</h1>
                                    <p>{article.body}</p>
                                </article>
                            </div>
                        )}
                    </Article>
                )} />


            </div>
    }
}

