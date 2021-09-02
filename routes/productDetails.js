const express = require('express')
const router = express()


router.get('/:shoeId', async (req, res) => {

    const shoeId = req.params.shoeId
    const shoe = await models.ShoeTable.findOne({
        include: [
            {
                model: models.Comment,
                as: 'comment'
            },
            {
                model: models.User,
                as: 'user'
            }
        ],
        where: {
            id: shoeId
        }
    })

    res.render('product-details', shoe.dataValues)
})

router.post('/:shoeId/add-comment', async (req, res) => {

    const shoeId = req.params.shoeId
    const userId = req.session.user.userId
    const title = req.body.title
    const message = req.body.message

    let comment = models.Comment.build({
        title: title,
        message: message,
        shoe_id: shoeId,
        user_id: userId
    })

    let savedComment = await comment.save()

    if (savedComment) {
        res.redirect(`/product-details/${shoeId}`)
    } else {
        res.render('product-details', { errorMessage: "Error adding comment." })
    }

})


module.exports = router