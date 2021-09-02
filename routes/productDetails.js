const express = require('express')
const router = express()


router.get('/', (req, res) => {
    res.render('product-details')
})




module.exports = router