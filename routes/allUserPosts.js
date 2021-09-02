const express = require('express')
const router = express()

router.get('/', async (req, res) => {

    let shoes = await models.ShoeTable.findAll({
        where: {
            user_id: req.session.user.userId
        }
    })

    res.render('allUserPosts', {shoes: shoes})
})





module.exports = router