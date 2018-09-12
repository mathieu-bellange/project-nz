import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faBars, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import './app.css';
import Nav from './nav';
import Home from './home';
import { RoadTrip } from './road-trip';
import About from './about';
import OutdatedBrowserService from './outdated-browser.service';

class AppWrapper extends React.Component {
  outdatedBrowserService = new OutdatedBrowserService();

  constructor(props) {
    super(props);
    library.add(faTimes, faBars, faCaretLeft, faCaretRight);
  }

  render() {
    return (
      <div id="wrapper">
        <Nav></Nav>
        <Switch>
          { this.outdatedBrowserService.isOutdated() ? '' : <Route exact path="/journal-de-bord" component={RoadTrip}/> }
          <Route path="/sur-nous" component={About}/>
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
