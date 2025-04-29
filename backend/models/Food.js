const mongoose = require('mongoose');

const Foodschema = mongoose.Schema({
    fName: { type: String, required: true },
    fDescription: { type: String, required: true },
    fImage: { type: String, required: true },
    fPrice: { type: Number, required: true },
    fQuantity: { type: Number, required: true }, 
    fStatus: { type: String, enum: ["Available", "Out of Stock"], default: "Available" },
    fCategory: { type: String, required: true } // 
}, { timestamps: true });

module.exports = mongoose.model('Food', Foodschema);
