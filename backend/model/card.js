const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        trime: true,
        required: true,
        maxlength: 20
    },
    description: {
        type:String,
        trim: true,
        required: true,
        maxlength: 54
    },
    column_id: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
    }
})


module.exports = mongoose.model("Card", cardSchema)