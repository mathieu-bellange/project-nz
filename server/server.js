// BACKLOG mise en place du serveur distribuant les images gzip, cache... trello:#74
const express = require('express');

const app = express();

app.use('/', express.static('public'));

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
