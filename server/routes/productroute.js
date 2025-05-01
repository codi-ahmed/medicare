const express = require('express');
const router = express.Router();
const { addProduct , updateProductQuantity, updatePrice ,  getProducts} = require('../controllers/productcontroller');

router.post('/add' , addProduct );
router.put('/update-quantity', updateProductQuantity);
router.get('/get',  getProducts);
router.put('/update-price' , updatePrice);

module.exports = router;