import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';
import Nav from './nav';
import Home from './home';
import { RoadTrip } from './road-trip';
import About from './about';
import OutdatedBrowserService from './outdated-browser.service';

class AppWrapper extends React.Component {
  outdatedBrowserService = new OutdatedBrowserService();

  render() {
    return (
      <div id="wrapper">
        <Nav></Nav>
        <Switch>
          { this.outdatedBrowserService.isOutdated() ? '' : <Route exact path="/road-trip" component={RoadTrip}/> }
          <Route path="/about" component={About}/>
          <Route component={Home}/>
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <AppWrapper></AppWrapper>
  </Router>,
  document.getElementById('container')
);
