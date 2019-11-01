import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Home from "./Home"
// import Players from "./Players"
// import Teams from "./Teams"
import Nav from "./Nav"
// import TeamPage from "./TeamPage"
// import Articles from "./Articles"
import Loading from "./Loading"

import DynamicImport from "./DynamicImport"

//When load prop is invoked, it will use the dynamic import syntax to go and import the component or the module 
const Home = (props) => (
  <DynamicImport load={() => import("./Home")}>
    {(Component) => Component === null
      ? <Loading /> : <Component {...props} />}
  </DynamicImport>)

const Players = (props) => (
  <DynamicImport load={() => import("./Players")}>
    {(Component) => Component === null
      ? <Loading /> : <Component {...props} />}
  </DynamicImport>)

const Teams = (props) => (
  <DynamicImport load={() => import("./Teams")}>
    {(Component) => Component === null
      ? <Loading /> : <Component {...props} />}
  </DynamicImport>)

const TeamPage = (props) => (
  <DynamicImport load={() => import("./TeamPage")}>
    {(Component) => Component === null
      ? <Loading /> : <Component {...props} />}
  </DynamicImport>)

const Articles = (props) => (
  <DynamicImport load={() => import("./Articles")}>
    {(Component) => Component === null
      ? <Loading /> : <Component {...props} />}
  </DynamicImport>
)

function App() {
  return (
    <div>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/players" component={Players}></Route>
            <Route path="/teams" component={Teams}></Route>
            {/* Route w/o path will always match but will only match if none match before it when using switch*  - :team is ambiguous so move to bottom*/}
            <Route path="/:teamId" exact component={TeamPage}></Route>
            <Route path="/:teamId/articles" component={Articles}></Route>
            <Route render={() => <h1 className="text-center">404 - This endpoint does not exist</h1>}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
