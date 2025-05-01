
const express = require('express');
const router = express.Router();
const { addorder, getOrdersByDate, updateOrderStatus , getAllOrders } = require('../controllers/ordercontroller');

router.post('/create', addorder);


router.get('/getByDate/:date', getOrdersByDate);


router.patch('/updateStatus/:id', updateOrderStatus);


router.get('/all', getAllOrders);

module.exports = router;
