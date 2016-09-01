/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('capability', {
    capabilityId: {
      field: 'capability_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    partyId: {
      field: 'party_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'party',
        key: 'party_id'
      }
    },
    capName: {
      field: 'cap_name',
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    skill: {
      type: 'ARRAY',
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
