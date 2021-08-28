const express = require('express')
const router = express()

router.get('/', (req, res) => {
    res.render('register')
})

// post method for rgistering new user and adding user info to the Users postgres table (DB)
router.post('/add-user', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const dob = req.body.dob
    var password

    // verify if user entered the same string for password and confirmPassword text fields
    if (req.body.password == req.body.confirmPassword) {
        password = req.body.password
    } else {
        // send error message if password strings are not identical
        res.render('register', {passwordErrorMessage: 'Passwords do not match.'})
    }

    // encrypt password to be stored in Users table
    bcrypt.genSalt(10, function(error, salt) {
        if(!error) {
            bcrypt.hash(password, salt, function(error, hash) {
                if(!error) {
                    // create user object
                    const user = models.User.build({
                        username: username,
                        password: hash,
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        date_of_birth: dob
                    })
                    // save user object to user table
                    user.save()
                    .then(savedUser => {
                        console.log("New user has registered.")
                        res.redirect('/register')
                    })

                } else {
                    res.send("Error occured!")
                }
            })
        } else {
            res.send("Error occured!")
        }
    })

})



module.exports = router