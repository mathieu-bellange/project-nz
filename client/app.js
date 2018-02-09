import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import Nav from './nav';
import Home from './home';
import { RoadTrip } from './road-trip';
import About from './about';

class AppWrapper extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Nav></Nav>
        <Route exact path="/" component={Home}/>
        <Route exact path="/road-trip" component={RoadTrip}/>
        <Route path="/about" component={About}/>
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
