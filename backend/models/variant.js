module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define("Variant", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    flavor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aroma_photo: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    photo_src: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Variant.associate = function (models) {
    Variant.belongsTo(db.Product, { foreignKey: 'ProductId' });
    Variant.belongsTo(models.Size);
    Variant.hasOne(models.PriceInfo);
  };

  return Variant;
};