const express = require('express');
const stripe = require('stripe')('sk_test_51QTrHhDmeOtxZbxLYpubFS45fZ3K0gV7VCvOXBLPHO9i254olhLwfLbWEPu2f6k0eTRBhsyQavZp89UCGClpstpj00euhMqj7G'); // Stripe API anahtarınızı buraya ekleyin
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.getAllPayments);
router.get('/:payment_id', paymentController.getPaymentById);
router.post('/', paymentController.createPayment);
router.post('/stripe', paymentController.createStripePayment); 

module.exports = router;