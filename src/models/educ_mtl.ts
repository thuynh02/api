/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('educ_mtl', {
    educMtlId: {
      field: 'educ_mtl_id',
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
    submittedBy: {
      field: 'submitted_by',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userLvl: {
      field: 'user_lvl',
      type: DataTypes.STRING,
      allowNull: true
    },
    isRecommended: {
      field: 'is_recommended',
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'educ_mtl'
  });
};
