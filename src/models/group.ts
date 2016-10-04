/* jshint indent: 2 */

module.exports = function(sequelizea:any, DataTypes:any) {
  return sequelize.define('group', {
    groupId: {
      field: 'group_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'group'
  });
};
