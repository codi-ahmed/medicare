const express = require('express');
const router = express.Router();

const pharmaMiddleware = require('../middleware/pharmamiddleware');
const {addCompany  , getCompany , getCompanyNames } = require('../controllers/pharmacontrollers');

router.post('/add' , pharmaMiddleware.single('file') , addCompany );
router.get('/get', getCompany);
router.get('/get_names' ,  getCompanyNames);

module.exports = router;