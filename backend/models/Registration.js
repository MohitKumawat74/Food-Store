const mongoose  = require('mongoose')

const regschema = new mongoose.Schema({
    regName: { type: String, required: true, trim: true },
    regEmail: { type: String, required: true, unique: true, trim: true, lowercase: true, },
    regPassword: { type: String, required: true, minlength: 6 }
},{ timestamps: true })

module.exports = mongoose.model('Registration', regschema)