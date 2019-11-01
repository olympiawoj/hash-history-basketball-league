import React, { Component } from "react"
import PropTypes from "prop-types"
import { getArticle } from "../api"


//Article takes in articleID & teamId and  it calls it's child w/ that specific article after it's fetched it

export default class Article extends Component {

    static propTypes = {
        teamId: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    }

    state = {
        article: null
    }

    componentDidMount() {
        const { teamId, articleId } = this.props
        this.getArticle(teamId, articleId)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.articleId !== nextProps.articleId) {
            this.getArticle(nextProps.teamId, nextProps.articleId)
        }
    }

    getArticle = (teamId, articleId) => {
        this.setState(() => ({ article: null }))
        getArticle(teamId, articleId)
            .then((article) => this.setState(() => ({
                article
            })))
            .catch(error => console.log("Error getting article"))
    }

    render() {
        const { article } = this.state
        return this.props.children(article)
    }
}