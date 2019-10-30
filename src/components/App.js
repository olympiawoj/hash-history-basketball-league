import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./Home"
import Players from "./Players"
import Teams from "./Teams"
import Nav from "./Nav"

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
            {/* Route w/o path will always match but will only match if none match before it when using switch*/}
            <Route render={() => <h1 className="text-center">404 - This endpoint does not exist</h1>}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
