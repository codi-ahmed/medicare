const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const adminSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50
    },
    
    user:{
        type: String,
        required:true,

    },
    password:{
        type: String,
        required:true,

    }
  });
  
  adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10); // 10 rounds is good default
      this.password = await bcrypt.hash(this.password, salt); // hashed password replaces original
      next();
    } catch (err) {
      next(err);
    }
  });
  
  // 🔐 Method to compare password during login
  adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  const AdminModel = mongoose.model("Admin", adminSchema);
  
  module.exports = AdminModel;