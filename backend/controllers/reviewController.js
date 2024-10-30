const db = require('../models');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await db.Review.findAll();

        res.json(reviews);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createReview = async (req, res) => {
    try {
        const {rating, description, ProductId, UserId} = req.body;

        const createReview = await db.Review.create({
            rating,
            description,
            ProductId,
            UserId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createReview) {
            res.status(400).send('Review not created');
        }

        res.status(201).send('Review Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = {
    getAllReviews,
    createReview,
  
};