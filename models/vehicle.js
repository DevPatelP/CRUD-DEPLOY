
// import mongoose
const mongoose = require('mongoose')

//Create Schema definition object
const schemaDefinition = {
     vehicle: {
        type: String,
        required: true
     },
     model: {
        type: String,
        required: true
     },
     price: {
        type: String,
        required: true
     }
}

//Create mongoose schema using the definition object
var mongooseSchema = new mongoose.Schema(schemaDefinition);

//Create and export a mongoose model
module.exports = mongoose.model("Vehicle", mongooseSchema)