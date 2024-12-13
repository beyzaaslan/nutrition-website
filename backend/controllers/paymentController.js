const db = require('../models');
const stripe = require('stripe')('sk_test_51QTrHhDmeOtxZbxLYpubFS45fZ3K0gV7VCvOXBLPHO9i254olhLwfLbWEPu2f6k0eTRBhsyQavZp89UCGClpstpj00euhMqj7G'); // Stripe API anahtarınızı buraya ekleyin


const getAllPayments = async (req, res) => {
    try {
        const allPayments = await db.Payment.findAll();

        res.json(allPayments);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getPaymentById = async (req, res) => {
    try {
        const {payment_id} = req.params;

        const payment = await db.Payment.findOne({
            where: {id: payment_id}
        });

        if (!payment) {
            res.status(404).send('Payment not found');
        }

        res.json(payment);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createPayment = async (req, res) => {
    try {
        const {amount, type, orderId} = req.body;

        const createPayment = await db.Payment.create({
            amount,
            type,
            orderId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createPayment) {
            res.status(400).send('Payment not created');
        }

        res.status(201).send('Payment Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createStripePayment = async (req, res) => {
    try {
        const { amount, orderId } = req.body;

        // Ödeme tutarını cent cinsinden gönderdiğinizden emin olun (Stripe dolar cinsinden cent olarak alır)
        const paymentAmount = amount * 100; // örneğin 100.00 TL, 10000 cent olmalıdır.

        // Stripe ödeme isteği oluşturma
        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentAmount,
            currency: 'usd', // Burada ödeme yapacağınız para birimini belirtin.
            metadata: { orderId: orderId }
        });

        // Yeni ödeme kaydını veritabanına ekleyin
        const payment = await db.Payment.create({
            amount,
            type: 'credit_card',  // Stripe üzerinden ödeme yapıldığı için type'ı 'credit_card' olarak bırakıyoruz
            orderId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!payment) {
            res.status(400).send('Payment not created');
        }

        // Stripe client secret'ı frontend'e gönderin
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    createStripePayment
};