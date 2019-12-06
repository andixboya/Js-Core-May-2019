const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: { type: mongoose.SchemaTypes.String, required: true },
    creationDate: { type: mongoose.SchemaTypes.Date, default: Date.now },
    description: { type: mongoose.SchemaTypes.String },
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tag" }]
})

module.exports = mongoose.model("Image", ImageSchema);