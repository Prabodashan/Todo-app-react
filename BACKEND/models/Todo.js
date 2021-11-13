const mongoose = require("mongoose");

//Create todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter a title"],
    minlength: [3, "Minimum length of title would be 3 characters!"],
    maxlength: [20, "Maximum length of title would be 20 characters!"],
    validate: [validateTitle, "Enter title only using letters"],
  },
  description: {
    type: String,
    required: [true, "Enter a title"],
    minlength: [10, "Minimum length of title would be 10 characters!"],
    maxlength: [250, "Maximum length of title would be 250 characters!"],
  },
  creationDate: {
    type: Date,
    required: [true, "Enter a date"],
  },
});

//Custom title validation
function validateTitle(title) {
  const regEx = /^[a-zA-z\s]$/;
  return regEx.test(title);
}

module.exports = mongoose.model("Todo", todoSchema);
