/* jshint indent: 2 */

module.exports = function(sequelize:any, DataTypes:any) {
  return sequelize.define('project', {
    projectId: {
      field: 'project_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    groupId: {
      field: 'group_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'group',
        key: 'group_id'
      }
    },
    oic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    office: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'project'
  });
};
