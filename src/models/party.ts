/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('party', {
    partyId: {
      field: 'party_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    partyType: {
      field: 'party_type',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'party'
  });
};
