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

// static folder for images
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/men', (req, res) => {
  res.render('men')
})

app.get('/women', (req, res) => {
  res.render('women')
})
app.get('/newreleases', (req, res) => {
  res.render('newreleases')
})

app.get('/menAccessories', (req, res) => {
  res.render('menAccessories')
})
<<<<<<< HEAD

app.get('/womenAccessories', (req, res) => {
  res.render('womenAccessories')
})
//mens-shoe page code
app.get('/mens-shoes', (req, res)=>{
  res.render('mens-shoes')
=======
// render the users-post
app.get('/users-post', (req, res)=>{
  res.render('users-post')
>>>>>>> d7ee2a77042d04137211fb71cf4034c1aafaf156
})
// post to the shoe table
app.post('/users-post', (req, res)=>{
  const name = req.body.name
  const description = req.body.description
  const size = req.body.size
  const style = req.body.style
  const price = req.body.price
  const image = req.body.image

  let shoetable = models.ShoeTable.build({
    name: name,
    description: description,
    size: size,
    style: style,
    price: price,
    image: image

<<<<<<< HEAD
=======
  })
  shoetable.save()
  //res.redirect('index') //probably change mens to index
})
>>>>>>> d7ee2a77042d04137211fb71cf4034c1aafaf156

// delete or update the post

app.listen(PORT, () => {
  console.log('Server is running... you better go catch it')
});