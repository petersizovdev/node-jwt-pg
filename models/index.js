const User = require('./User');
const Role = require('./Role');

User.belongsToMany(Role, { through: 'userRole' });
Role.belongsToMany(User, { through: 'userRole' });

module.exports = {
  User,
  Role,
};