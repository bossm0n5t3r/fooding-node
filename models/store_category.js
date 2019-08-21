module.exports = (sequelize, DataTypes) => (
  sequelize.define('store_category', {
    store_category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);