const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const testUser = async (request, h) => {
  const response = h.response({
    status: 'success',
    message: 'Ini test user',
  })
  response.code(200)
  return response
}

const registerUser = async (request, h) => {
  const payload = request.payload

  if (payload.password != payload.confirm_password) {
    const response = h.response({
      status: 'failed',
      message: 'Password dan Confirm Password tidak cocok',
    })
    response.code(400)
    return response
  }

  const existedUser = await request.mongo.db
    .collection('users')
    .findOne({ email: payload.email })

  if (existedUser) {
    const response = h.response({
      status: 'failed',
      message: 'Email sudah terdaftar',
    })
    response.code(400)
    return response
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(payload.password, salt)

  const user = {
    username: payload.username,
    email: payload.email,
    password: hashedPassword,
    created_at: new Date(),
  }

  const status = await request.mongo.db.collection('users').insertOne(user)

  const response = h.response({
    status: 'success',
    message: 'Akun berhasil terdaftar',
    status,
  })
  response.code(201)

  return response
}

const loginUser = async (request, h) => {
  const payload = request.payload

  const user = await request.mongo.db
    .collection('users')
    .findOne({ email: payload.email })

  if (!user) {
    const response = h.response({
      status: 'failed',
      message: 'Email tidak ditemukan',
    })
    response.code(404)
    return response
  }

  const isValid = await bcrypt.compare(payload.password, user.password)
  if (!isValid) {
    const response = h.response({
      status: 'failed',
      message: 'Password salah',
    })
    response.code(401)
    return response
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '3d',
    }
  )

  const response = h.response({
    status: 'success',
    message: 'Login berhasil',
    data: {
      token,
    },
  })
  response.code(200)
  return response
}

module.exports = {
  testUser,
  registerUser,
  loginUser,
}
