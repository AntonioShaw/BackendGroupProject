const express = require('express')
const router = express()


router.get('/:shoeId', async (req, res) => {

    const shoeId = req.params.shoeId
    const shoe = await models.ShoeTable.findByPk(shoeId)

    res.render('product-details', shoe.dataValues)
})




module.exports = router