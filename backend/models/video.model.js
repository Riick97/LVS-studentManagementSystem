const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    path: {type: String, required: true},
}, {
    timestamps: false,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;