/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_staff', {
    projectId: {
      field: 'project_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(project_staff_project_id_seq::regclass)',
      primaryKey: true,
      references: {
        model: 'project',
        key: 'project_id'
      }
    },
    personId: {
      field: 'person_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'project_staff'
  });
};
