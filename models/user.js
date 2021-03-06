const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, index: true},
    surname: {type: String, index: true},
    email: String,
    password: String,
    phone: String,
    city: {type: String, index: true},
    klaim: {type: String, index: true},
    tags: {type: [String], index: true},
    linkedin: String,
    facebook: String,
    google:String,
    web:String,
    userImage: {
        type: String,
        default: process.env.URL + '/images/service-default.jpg'
    },
    bigImage: {
        type: String,
        default: process.env.URL + '/images/service-default.jpg'
    },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
    url: String
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;