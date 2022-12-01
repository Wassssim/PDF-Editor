const mongoose = require('mongoose');

const PdfFile = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
});

// this creates this schema in our database
module.exports = mongoose.model("PdfFile", PdfFile);