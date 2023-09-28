const mongoose = require('mongoose');

const depreciationperiodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    updated_by: {
        type: String,
        required: true,
    },
    updated_at: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model('depreciationperiod', depreciationperiodSchema);