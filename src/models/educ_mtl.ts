/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('educ_mtl', {
    educ_mtl_id: {
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
    submitted_by: {
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
    user_lvl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_recommended: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'educ_mtl'
  });
};
