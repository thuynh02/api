/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('capability', {
    capability_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    party_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'party',
        key: 'party_id'
      }
    },
    cap_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    skill: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'capability'
  });
};
