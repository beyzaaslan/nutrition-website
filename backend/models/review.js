module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        rating: {type: DataTypes.INTEGER, required: true, allowNull: false},
        description: {type: DataTypes.STRING, required: true, allowNull: false},
    });

    return Review;
}