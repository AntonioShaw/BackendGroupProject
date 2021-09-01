const express = require('express')
const router = express.Router()

router.get('/users-post', (req, res)=>{
    res.render('users-post')
})



module.exports = router