const db = require('../models');

const getAllOrders = async (req, res) => {
    try {
        const orders = await db.Order.findAll();

        res.json(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getOrderById = async (req, res) => {
    try {
        const {order_id} = req.params;

        const order = await db.Order.findOne({
            where: {id: order_id}
        });

        if (!order) {
            res.status(404).send('Order not found');
        }

        res.json(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOrder = async (req, res) => {
    try {
        const {total, status, UserId} = req.body;

        const createOrder = await db.Order.create({
            total,
            status,
            UserId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createOrder) {
            res.status(400).send('Order not created');
        }

        res.status(201).send('Order Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
};