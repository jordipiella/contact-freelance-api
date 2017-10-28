const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {type: String, index: true},
    description: {type: String, index: true},
    tags: {type: [String], index: true},
    bigImage: {
        type: String,
        default: '/images/service-default.jpg'
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
    url: String
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;