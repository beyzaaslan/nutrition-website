const db = require('../models');

const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await db.OrderItem.findAll();

        res.json(orderItems);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
/* order adres kargo  kontrol  tüm item  at ordera ata  */
const getOrderItemById = async (req, res) => {
    try {
        const {orderItem_id} = req.params;

        const orderItem = await db.OrderItem.findOne({
            where: {id: orderItem_id}
        });

        if (!orderItem) {
            res.status(404).send('Order Item not found');
        }

        res.json(orderItem);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOrderItem = async (req, res) => {
    try {
        const {quantity, price, OrderId, productId} = req.body;

        const createOrderItem = await db.OrderItem.create({
            quantity,
            price,
            OrderId,
            productId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createOrderItem) {
            res.status(400).send('Order Item not created');
        }

        res.status(201).send('Order Item Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllOrderItems,
    getOrderItemById,
    createOrderItem
};