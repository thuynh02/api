/* jshint indent: 2 */

module.exports = function(sequelize:any, DataTypes:any) {
  return sequelize.define('person', {
    personId: {
      field: 'person_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    auth0Id: {
      field: 'auth0_id',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    groupId: {
      field: 'group_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fName: {
      field: 'f_name',
      type: DataTypes.STRING,
      allowNull: true
    },
    lName: {
      field: 'l_name',
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
    profilePicture:{
      field: 'profile_picture',
      type: DataTypes.STRING,
      allowNull: true
      },
    skillsVisited:{
      field: 'skills_visited',
      type: DataTypes.BOOLEAN,
      defaultValue: false
      },
    interestsVisited:{
      field: 'interests_visited',
      type: DataTypes.BOOLEAN,
      defaultValue: false
      },
    infoVisited:{
      field: 'info_visited',
      type: DataTypes.BOOLEAN,
      defaultValue: false
      }
  }, {
    timestamps: false,
    tableName: 'person'
  });
};
