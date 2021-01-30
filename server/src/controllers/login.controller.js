// const { users } = require('../data/data');
const User = require('../models/user.model')


module.exports.login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email, password })

    if (user) {
        res.json({ status: 'success'})
    } else {
        res.json({ status: 'error', message: 'Email or password không đúng' })
    }
}


module.exports.loginGetUser = async (req, res) => {
    const users = await User.find()
    res.json({ isSuccess: true, data: users })
}
