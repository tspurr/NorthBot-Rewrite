const { Schema, model } = require("mongoose")

const Guild = Schema({
    id: Number,
    prefix: {
        default: 0,
        type: Number
    }
});

module.exports = model('Guild', Guild);