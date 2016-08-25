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
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true
      },
    profile_picture:{
      type: DataTypes.STRING,
      allowNull: true
      },
    skills_visited:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
      },
    interests_visited:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
      },
    info_visited:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
      }, 
  }, {
    timestamps: false,
    tableName: 'person'
  });
};
