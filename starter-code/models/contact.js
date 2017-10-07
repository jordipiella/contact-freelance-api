const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  telf: String,
  email: String,
  message: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  service: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  section: [{ type: Schema.Types.ObjectId, ref: 'Section'}]
}, {
      timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at"
      }
  });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;