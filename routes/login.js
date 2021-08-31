const express = require('express')
const router = express()

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/sign-in', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // search Users table for the username that was entered (DB)
    let user = await models.User.findOne({
        where: {
            username: username
        }
    })

    // if username is found (not null) (DB)
    if (user != null) {
        // use bcrypt to compare password entered with encrypted password associated to this username (DB)
        bcrypt.compare(password, user.password, (error, result) => {
            if(result) {
                // if passwords match assign this user id to the current session (DB)
                if (req.session) {
                    req.session.user = {userId: user.id}
                }
                res.redirect('/')
            } else {
                // if passwords do not match send an error message (DB)
                res.render('login', {errorMessage: "Password is incorrect"})
            }
        })
    } else { // if username is not found
        res.render('login', {errorMessage: "Username is incorrect"})
    }
})



module.exports = router