const db = require('../models');

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

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment
};