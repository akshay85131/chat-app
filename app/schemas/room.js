const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  connection: { type: [{ userId: String, socketId: String }] }
})
const roomModel = mongoose.model('room', roomSchema)
module.exports = roomModel
