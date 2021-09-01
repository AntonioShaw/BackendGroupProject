const express = require('express')
const router = express()

// declare number of salt rounds for bcrypt
const salt = 10

router.get('/', (req, res) => {
    res.render('register')
})

// post method for rgistering new user and adding user info to the Users postgres table (DB)
router.post('/add-user', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const dob = req.body.dob
    var password

    // verify if user entered the same string for password and confirmPassword text fields (DB)
    if (req.body.password == req.body.confirmPassword) {
        password = req.body.password
    } else {
        // send error message if password strings are not identical (DB)
        res.render('register', { passwordErrorMessage: 'Passwords do not match.' })
    }


    // check if username already exists
    const persistedUser = await models.User.findOne({
        where: {
            username: username
        }
    })

    // if username does not exist create new user
    if (persistedUser == null) {
        // encrypt password to be stored in Users table (DB)
        bcrypt.hash(password, salt, async (error, hash) => {
            if (error) {
                res.send("Error occured while creating user.")
            } else {
                // create user object (DB)
                const user = models.User.build({
                    username: username,
                    password: hash,
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    date_of_birth: dob
                })
                // save user object to user table (DB)
                let savedUser = await user.save()
                if (savedUser != null) {
                    res.redirect('/login')
                } else {
                    res.render('register', { usernameErrorMessage: "Username already exists" })
                }
            }
        })
    } else {
        res.render('register', { usernameErrorMessage: "Username already exists" })
    }




})



module.exports = router