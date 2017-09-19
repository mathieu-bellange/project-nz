const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
app.use('/public', express.static('public'));

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
