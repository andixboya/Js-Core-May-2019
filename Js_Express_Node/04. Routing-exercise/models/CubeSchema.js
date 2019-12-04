const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CubeSchema = new Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    imageUrl: { type: mongoose.SchemaTypes.String ,required: true},
    difficulty: { type: mongoose.SchemaTypes.Number }
})

CubeSchema.path('name').validate(function () {
    //so basically a function which validates the field , why do we need path,
    //we`ll find out later or doc. read
    return 3 <= this.name.length && this.name.length <= 15;
}, 'Name must be between 3 and 15 symbols!');

CubeSchema.path('description').validate(function () {
    return 20 <= this.description.length && this.description.length <= 300;
}, 'Description must be between 20 and 300 symbols')

CubeSchema.path('imageUrl').validate(function () {
    return this.imageUrl.startsWith('https://')
}, 'Image URL must start with https://')
CubeSchema.path('difficulty').validate(function () {
    return 1 <= this.difficulty && this.difficulty <= 6;
}, 'difficulty must be between 1 and 6 ');

//here we export the below model (mongoose)
const Cube = mongoose.model('cube', CubeSchema);

module.exports = Cube;