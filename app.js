const PORT = 3000
const express = require('express');
const app = express();

const mustacheExpress = require('mustache-express');

const path = require('path');

const session = require('express-session')

global.models = require('./models')

// import register.js route (DB)
const registerRouter = require('./routes/register')
// import login.js route (DB)
const loginRouter = require('./routes/login')

// import bcryptjs package (DB)
global.bcrypt = require('bcryptjs')

// import authenticate function (DB)
const authenticate = require('./middleware/authentication')

// create path for partial (DB)
const VIEWS_PATH = path.join(__dirname, './views');




// set up express to use mustache-express as template page (DB)
app.engine ('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
// set location of pages to views directory (DB)
app.set('views', VIEWS_PATH);
// set page extention to mustache (DB)
app.set('view engine', 'mustache');

// tell server to use urlencoded for body parsing (DB)
app.use(express.urlencoded())

app.use(session({
  secret: "SuperSecretKeyThatNoOneWillGuess",
  saveUninitialized: true,
  resave: true
}))

app.use('/register', registerRouter)
app.use('/login', loginRouter)


// set path for static css and js files (DB)
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})



app.listen(PORT, () => {
  console.log('Server is running... you better go catch it')
});