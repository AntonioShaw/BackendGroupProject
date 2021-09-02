const express = require('express')
const formidable = require('formidable')
const router = express.Router()

router.get('/', async (req, res) => {

    let shoes = await models.ShoeTable.findAll({
        where: {
            user_id: req.session.user.userId
        }
    })

    res.render('allUserPosts', {shoes: shoes})
})

function uploadFile(req, callback) {

    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        
        file.path = __basedir + '/uploads/' + file.name
    })
    .on('file', (name, file) => {
       callback(file.name) 
    })
}

router.post('/upload', (req, res) => {

    uploadFile(req, (photoURL) => {
        res.send("UPLOAD")
    })

})



module.exports = router