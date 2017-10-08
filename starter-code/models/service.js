const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    description: String,
    tags: [],
    bigImage: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }]
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;