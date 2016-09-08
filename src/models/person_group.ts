/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person_group', {
    groupId: {
      field: 'group_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(person_group_group_id_seq::regclass)',
      primaryKey: true,
      references: {
        model: 'group',
        key: 'group_id'
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
    tableName: 'person_group'
  });
};
