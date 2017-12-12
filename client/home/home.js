import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

// PLANNING revoir le positionnement des composants sous mobiles trello:#34
// DONE revoir le positionnement de l'image de fond sous mobiles trello:#34
export default class Home extends React.Component {
  render() {
    return (
      <main id="home">
        <header>
          <h1>Notre voyage</h1>
          <p>Expliqué par des gens bien d'une super façon</p>
        </header>
        <div id="content">
          <img src="images/home_1920.jpg"></img>
          <Link to="/road-trip">Commencer le voyage</Link>
        </div>
      </main>
    );
  }
}
