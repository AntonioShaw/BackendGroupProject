
// middleware fuction to authenticate user access
function authenticate (req, res, next) {
    console.log('Authenticate Middleware')
    if(req.session) {
        if(req.session.user) {
            console.log(req.session.user)
            res.locals.isAuthenticated = true
            next()
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}


module.exports = authenticate