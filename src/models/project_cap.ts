/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_cap', {
    projectCapId: {
      field: 'project_cap_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projectId: {
      field: 'project_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'project_id'
      }
    },
    capabilityId: {
      field: 'capability_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'capability',
        key: 'capability_id'
      }
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
    proficiencyLvl: {
      field: 'proficiency_lvl',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'project_cap'
  });
};
