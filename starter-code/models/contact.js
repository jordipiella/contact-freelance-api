const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  tel: String,
  email: String,
  userEmail: String,
  message: String,
  origin: {
    type: String, 
    enum: ['USER', 'SERVICE', 'SECTION'],
    default: 'USER'
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  section: { type: Schema.Types.ObjectId, ref: 'Section'}
}, {
      timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at"
      }
  });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;