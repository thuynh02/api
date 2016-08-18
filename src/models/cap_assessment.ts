/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cap_assessment', {
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(cap_assessment_person_id_seq::regclass)',
      primaryKey: true,
      references: {
        model: 'person',
        key: 'person_id'
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
    proficiency_lvl: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    interest_lvl: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'cap_assessment'
  });
};
