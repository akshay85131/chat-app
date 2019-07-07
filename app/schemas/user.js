const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const defalutUserImage = 'user.jpg'
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, defalut: null },
  picture: { type: String, defalut: defalutUserImage }
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.picture) {
    user.picture = defalutUserImage
  }
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

const userModel = mongoose.model('user', userSchema)
module.exports = userModel
