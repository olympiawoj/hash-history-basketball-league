import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
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
          <Route path="/" exact component={Home}></Route>
          <Route path="/players" component={Players}></Route>
          <Route path="/teams" component={Teams}></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
