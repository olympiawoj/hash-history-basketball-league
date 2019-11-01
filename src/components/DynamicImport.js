/* This component will be used to dynamically import diff modules when needed


Eventuallly we'll import Dynamic import, but instead of importing it statically, we'll use dynamic import 

When the component mounts, we'll invoke this.props.load which we're getting from App which dynamically returns us a promise that when  this promise resolves we'll get us the module

Then call setState and set component

We know we need to invoke children, and pass it the component
*/


import { Component } from "react"

export default class DynamicImport extends Component {
    state = {
        component: null
    }

    componentDidMount() {
        this.props.load()
            .then((mod) => this.setState(() => ({
                component: mod.default
            })))
            .catch()
    }
    render() {
        //this is the component itself coming rom the module importe when this.props.load was invoked
        return this.props.children(this.state.component)
    }

}