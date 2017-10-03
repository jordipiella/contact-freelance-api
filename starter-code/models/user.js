const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    country: String,
    klaim: String,
    tags: [],
    linkedin: String,
    facebook: String,
    google:String,
    web:String,
    userImage: String,
    bigImage: String,
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }]
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;