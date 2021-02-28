const User = require('../models/user.model')

module.exports.getUsers = async (req, res) => {
  const users = await User.find()
  res.json({ isSuccess: true, data: users })
}

module.exports.getUserById = async (req, res) => {

  const useremail = await User.findOne({ email })
  if (useremail) {
    return res.json({ isSuccess: true, data: useremail.email })
  }

}

module.exports.createUser = async (req, res) => {
  const { email, password, firstName, lastName, birthday, gender } = req.body

  if (!email || !password || !firstName || !lastName || !birthday || !gender) {
    return res.json({
      isSuccess: false,
      message: 'Missing required fields',
    });
  }

  const user = await User.findOne({ email })

  if (user) {
    return res.json({
      isSuccess: false,
      message: 'Email đã được đăng ký',
    })
  }

  const newUser = new User({ ...req.body })

  newUser.save(function (err, doc) {
    if (err) {
      return res.json({
        isSuccess: false,
        message: 'Database error',
      })
    } else {
      return res.json({
        isSuccess: true,
        message: 'User is created',
        data: doc,
      })
    }
  });
}