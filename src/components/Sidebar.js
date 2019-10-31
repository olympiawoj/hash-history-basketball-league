import React from "react"
import PropTypes from "prop-types"
import { Link, Route } from "react-router-dom"
import slug from "slug"

//Create custom link component (instead of NavLink)
function CustomLink({ to, children }) {
    //We need to return Route b/c it gives us access to match
    //return Route b/c it has built in location chekcer in it, we use to figure out if we sholud change style of a partivular link
    //Match tells us if current app's location matches to.pathname if it does listItem will be bold if it doesn't then we'll have normal font
    //TO is an object w a pathname property on it
    return <Route path={to.pathname} children={({ match }) => (
        <li style={{ listStyleTope: 'none', fontWeight: match ? 'bold' : 'normal' }}>
            <Link to={to}>{children}</Link>
        </li>
    )}></Route>
}

export default function Sidebar({ title, list, loading, location, match }) {
    return loading === true ?
        <h1>Loading</h1>
        : <div>
            <h3 className="header">{title}</h3>
            <ul className="sidebar-list">
                {list.map((item) => (
                    //slug makes our item snake cased
                    //pass along location.search which will eventually be a query parameter
                    <CustomLink key={item} to={{ pathname: `${match.url}/${slug(item)}`, search: location.search }}>
                        {item.toUpperCase()}
                    </CustomLink>
                ))}
            </ul>
        </div>
}

Sidebar.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired

}