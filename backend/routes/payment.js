const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.getAllPayments);
router.get('/:payment_id', paymentController.getPaymentById);
router.post('/', paymentController.createPayment);

module.exports = router;