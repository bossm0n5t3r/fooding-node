module.exports = (sequelize, DataTypes) => (
  sequelize.define('store_review', {
    store_review_comment: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);