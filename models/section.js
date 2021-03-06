const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    name: {type: String, index: true},
    description: {type: String, index: true},
    tags: {type: [String], index: true},
    bigImage: {
        type: String,
        default: process.env.URL + '/images/section-default.jpg'
    },
    portfolio: [{
        name: String,
        description: String,
        photo: String
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    url: String
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;