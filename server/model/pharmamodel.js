const mongoose = require('mongoose');

const pharmaSchema = new mongoose.Schema({
    fileUrl: {
      type: String,
    },
    company: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    }
  }, { timestamps: true });


  const Pharma = mongoose.model('Pharma', pharmaSchema);
module.exports = Pharma;