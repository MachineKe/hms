const mongoose = require('mongoose')

let mongoUrl = 'mongodb+srv://chesise:172.16.163.63.3@cluster0.qqet35g.mongodb.net/mern-rooms'
mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })

let connection = mongoose.connection

connection.on('error', () => {
  console.log('MongoDb connection failed')
})

connection.on('connected', () => {
  console.log('MongoDb connection succesful')
})

module.exports = mongoose