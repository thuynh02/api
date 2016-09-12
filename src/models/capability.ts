/* jshint indent: 2 */

module.exports = function(sequelize:any, DataTypes:any) {
  return sequelize.define('capability', {
    capabilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'capability_id'
    },
    partyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'party_id',
      references: {
        model: 'party',
        key: 'party_id'
      }
    },
    capabilityName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'cap_name',
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
