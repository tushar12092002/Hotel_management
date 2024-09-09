const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// define person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  //pre middleware fn trigger when we perform save operation
  const person = this;
  // hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hashedPassword(person.password, salt);
    // rewrite the password with hashed one
    person.password = hashedPassword;
    next(); //next call_back fn person schema that to save it in databse
  } catch (error) {
    return next(error);
  }
});

personSchema.method.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

// Create Person Model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
