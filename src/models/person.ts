/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cohort: {
      type: DataTypes.STRING,
      allowNull: true
    },
    office: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'person'
  });
};
