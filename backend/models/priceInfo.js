module.exports = (sequelize, DataTypes) => {
    const PriceInfo = sequelize.define('PriceInfo', {
        profit: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: false},
        total_price: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: false},
        discounted_price: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: true},
        price_per_servings: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: true},
        discount_percentage: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: true},
    });

    return PriceInfo;
};