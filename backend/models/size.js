module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define("Size",{
      gram: {type: DataTypes.INTEGER,allowNull: false,},
      pieces: {type: DataTypes.INTEGER,allowNull: false,},
      total_services: {type: DataTypes.INTEGER,allowNull: false,},
    });
    return Size;
  };
  