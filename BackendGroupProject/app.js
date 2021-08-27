const stripe = require('stripe')('sk_test_51JT7KJE0bFkJrUC3x9ZcQ1Z6tECdWzqBDbrYcL1yAoB1Ledq5ghg6U3aGPjoeuviulnXSEWQxdo2glycIOfxbxrF00uUdyEbCs');
const express = require('express');
const app = express();

const mustacheExpress = require('mustache-express');
const path = require('path');



const PATH = 3000
const VIEWS_PATH = path.join(__dirname, );


const YOUR_DOMAIN = 'http://localhost:8000';

app.use(express.static('public'));

app.engine ('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
app.set('views', VIEWS_PATH);
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  res.render('index', {tripList: trips})
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})



app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url)
});

app.listen(4242, () => console.log('Running on port 4242'));