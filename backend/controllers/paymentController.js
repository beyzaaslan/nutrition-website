const db = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const StripeService = require('../services/stripeService');

const getAllPayments = async (req, res) => {
    try {
        const allPayments = await db.StripePayment.findAll({
            include: [{ 
                model: db.Order, 
                attributes: ['id', 'total', 'status'] 
            }]
        });
        
        res.json(allPayments);
    } catch (err) {
        res.status(500).json({
            message: 'Ödemeler alınırken hata oluştu',
            error: err.message
        });
    }
}

const getPaymentById = async (req, res) => {
    try {
        const { payment_id } = req.params;
        
        const payment = await db.StripePayment.findOne({
            where: { id: payment_id },
            include: [{ 
                model: db.Order, 
                attributes: ['id', 'total', 'status'] 
            }]
        });
        
        if (!payment) {
            return res.status(404).json({ message: 'Ödeme bulunamadı' });
        }
        
        res.json(payment);
    } catch (err) {
        res.status(500).json({
            message: 'Ödeme bilgisi alınırken hata oluştu',
            error: err.message
        });
    }
}

const createStripePayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        console.log("orderId",orderId);
        
        // Siparişi kontrol et
        const order = await db.Order.findOne({ 
            where: { 
                id: orderId, 
                UserId: req.user.id 
            } 
        });

        if (!order) {
            return res.status(404).json({ message: 'Sipariş bulunamadı' });
        }

        // Ödeme niyeti oluştur
        const paymentIntent = await StripeService.createPaymentIntent(order);
        
        res.status(200).json({
            clientSecret: paymentIntent.clientSecret,
            paymentIntentId: paymentIntent.paymentIntentId
        });
    } catch (err) {
        res.status(500).json({
            message: 'Ödeme oluşturulurken hata oluştu',
            error: err.message
        });
    }
}

const confirmStripePayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        
        const status = await StripeService.confirmPayment(paymentIntentId);
        
        res.status(200).json({ 
            status,
            message: status === 'succeeded' ? 'Ödeme başarıyla tamamlandı' : 'Ödeme başarısız' 
        });
    } catch (err) {
        res.status(500).json({
            message: 'Ödeme onaylanırken hata oluştu',
            error: err.message
        });
    }
}

const getStripePaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const payments = await db.StripePayment.findAll({
            include: [{ 
                model: db.Order,
                where: { UserId: userId },
                attributes: ['id', 'total', 'status'] 
            }],
            order: [['createdAt', 'DESC']]
        });
        
        res.json(payments);
    } catch (err) {
        res.status(500).json({
            message: 'Ödeme geçmişi alınırken hata oluştu',
            error: err.message
        });
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    createStripePayment,
    confirmStripePayment,
    getStripePaymentHistory
};