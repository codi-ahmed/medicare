const Pharma = require('../model/pharmamodel');

const addCompany =  async (req , res ) => {
    try {
        
        const file = req.file;
    const { company, userName } = req.body;

  



    const newPharma = new Pharma({
      fileUrl: file.path,
      company,
      userName
    });

    await newPharma.save();

    res.status(201).json({ message: " uploaded successfully", data: newPharma });
    } catch (error) {
      res.status(500).json({ message: "Upload failed", error: error.message });
    }

};

const getCompany = async (req , res) => {
  try {
    const companies = await Pharma.find();

    res.status(200).json({
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching doctors",
      error: error.message
    });
  }
};

const getCompanyNames = async (req, res) => {
  try {
    const companies = await Pharma.find({}, 'company'); 
    res.status(200).json({ data: companies });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {addCompany , getCompany , getCompanyNames};