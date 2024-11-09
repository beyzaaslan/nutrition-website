module.exports = (sequelize, DataTypes) => {
    const PriceInfo = sequelize.define("PriceInfo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profit: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discounted_price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        price_per_servings: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount_percentage: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    });

    PriceInfo.associate = function (models) {
        PriceInfo.belongsTo(models.Variant, {
            foreignKey: {
                name: 'variantId',
                type: DataTypes.UUID,
                allowNull: true
            }
        });
        PriceInfo.belongsTo(models.Product, {
            foreignKey: {
                name: 'ProductId',
                type: DataTypes.INTEGER,
                allowNull: true
            }
        });
    };

    return PriceInfo;
};