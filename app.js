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


// import logout.js route (AS)
const logoutRouter = require('./routes/logout')

// import allUserPosts.js route (DB)
const allUserPostsRouter = require('./routes/allUserPosts')

// import bcryptjs package (DB)
global.bcrypt = require('bcryptjs')

// import authenticate function (DB)
const authenticate = require('./middleware/authentication')

// create path for partial (DB)
const VIEWS_PATH = path.join(__dirname, './views');




// set up express to use mustache-express as template page (DB)
app.engine ('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'));
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



// custom middleware to toggle menu options based on user authentication
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.user == null ? false : true
  next()
})


// tell the server which Routers to use for each url path (DB)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/all-user-posts', authenticate, allUserPostsRouter)



// set path for static css and js files (DB)
app.use(express.static(__dirname + '/public'));

// static folder for images
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.render('index')
})


app.get('/athletic', (req, res) => {
  res.render('athletic')
})

app.get('/streetwear', (req, res) => {
  res.render('streetwear')
})

app.get('/casual', (req, res) => {
  res.render('casual')
})

app.get('/dress', (req, res) => {
  res.render('dress')
})

app.get('/accessories', (req, res) => {
  res.render('accessories')
})

// render the users-post
app.get('/users-post', (req, res)=>{
  res.render('users-post')


})

// post to the shoe table
app.post('/users-post', (req, res)=>{
  const name = req.body.name
  const description = req.body.description
  const size = req.body.size
  const style = req.body.style
  const price = req.body.price
  const image = req.body.image
  const userId = req.session.user.userId


  let shoetable = models.ShoeTable.build({
    name: name,
    description: description,
    size: size,
    style: style,
    price: price,
    image: image,
    user_id: userId,
    })
  
  shoetable.save()

})

app.listen(PORT, () => {
  console.log('Server is running... you better go catch it')
})
