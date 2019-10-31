import { Component } from "react"
import Proptypes from "prop-types"
import { getTeam } from "../api"
//Team receives ID of the team it should fetch info for, when it gets it, will invoke props.children, passing it the team
//Not importing React b/c not using JSX in this component

export default class Team extends Component {
    static propTypes = {
        id: Proptypes.string.isRequired,
        children: Proptypes.func.isRequired
    }

    state = {
        team: null,
    }

    componentDidMount() {
        this.fetchTeam(this.props.id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.fetchTeam(nextProps.id)
        }
    }

    fetchTeam = (id) => {
        this.setState(() => ({
            team: null
        }))

        getTeam(id)
            .then((team) => this.setState(() => ({ team })))
            .catch(error => console.log("Error fetching team"))
    }

    render() {
        return this.props.children(this.state.team)
    }
}