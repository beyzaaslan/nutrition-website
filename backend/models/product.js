module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: { type: DataTypes.STRING, allowNull: true },
      short_explanation: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
      slug: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
      photo_src: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
      usage: { type: DataTypes.TEXT, allowNull: true },
      features: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      comment_count: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      average_star: { type: DataTypes.DECIMAL(10, 2), allowNull: true, defaultValue: 0 },
     
    });
  
    Product.associate = function(models) {
      Product.hasMany(models.Review, { foreignKey: 'ProductId' });
      Product.belongsToMany(models.Category, { through: 'ProductCategory' });
      Product.hasOne(models.PriceInfo, { foreignKey: 'ProductId' });
    };
  
    return Product;
  };
  