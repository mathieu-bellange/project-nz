import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import Nav from './nav';
import Home from './home';
import About from './about';

ReactDOM.render(
  <Router>
    <div id="wrapper">
      <Nav></Nav>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>,
  document.getElementById('container')
);