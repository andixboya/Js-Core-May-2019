const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({

    name: { type: mongoose.SchemaTypes.String, required: true },
    creationDate: { type: mongoose.SchemaTypes.Date, default: Date.now, required: true },
    //below we link the NAME of the schema
    images: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Image" }]
})

module.exports = mongoose.model("Tag", TagSchema); 