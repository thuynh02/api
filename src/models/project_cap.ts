/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_cap', {
    project_cap_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'project_id'
      }
    },
    capability_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'capability',
        key: 'capability_id'
      }
    },
    party_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'party',
        key: 'party_id'
      }
    },
    proficiency_lvl: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'project_cap'
  });
};
