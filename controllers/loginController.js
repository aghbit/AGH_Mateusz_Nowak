const User = require("../models/user")


exports.logout = async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
}

exports.loginPost = async(req, res) => {
    try {
        const user = await validateLogin(req)
        req.session.user = { id: user.id, isLoggedIn: true}
        res.redirect('/')
    } catch (error) {
        res.render('index',{
            errorMessage: error.message
        }) 
    }
}

async function validateLogin(req){
    const email = req.body.email
    if (email == '')
        throw new Error('Please provide an email')
    let user = await User.findOne({email: email})

    if (user == null){
        user = new User({email: email})
        await user.save()
    }

    return user
}