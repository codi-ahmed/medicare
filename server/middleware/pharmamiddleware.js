const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',            
    resource_type: 'auto',         
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'pdf'],
  },
});

// Multer middleware
const pharma = multer({ storage });

module.exports = pharma;
