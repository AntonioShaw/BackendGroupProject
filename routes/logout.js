const express = require('express')
const router = express()

router.get('/', (req, res, next) => {
    if (req.session) {
        req.session.destroy((error) => {
            if(error) {
                next(error)
            } else {
                res.redirect('/')
            }
        })
    }
})

module.exports = router