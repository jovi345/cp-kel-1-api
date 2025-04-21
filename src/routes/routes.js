const { testUser, registerUser, loginUser } = require('../handler/userHandler')

const routes = [
  {
    method: 'GET',
    path: '/api/user/test',
    handler: testUser,
  },
  {
    method: 'POST',
    path: '/api/user/register',
    handler: registerUser,
  },
  {
    method: 'POST',
    path: '/api/user/login',
    handler: loginUser,
  },
]

module.exports = routes
