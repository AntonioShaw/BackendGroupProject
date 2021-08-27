const PORT = 3000
const express = require('express');
const app = express();

const mustacheExpress = require('mustache-express');

const path = require('path');

const registerRouter = require('./routes/register')

// import bcryptjs package
global.bcrypt = require('bcryptjs')

// import authenticate function
const authenticate = require('./middleware/authentication')

// create path for partial
const VIEWS_PATH = path.join(__dirname, './views');


app.use(express.static('/public'));

// set up express to use mustache-express as template page
app.engine ('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
// set location of pages to views directory
app.set('views', VIEWS_PATH);
// set page extention to mustache
app.set('view engine', 'mustache');


app.use('/register', registerRouter)


app.listen(PORT, () => {
  console.log('Server is running... you better go catch it')
});