require('dotenv').config()

const Hapi = require('@hapi/hapi')
const routes = require('./src/routes/routes')

const init = async () => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const dbName = process.env.DB_NAME
  const url = `mongodb+srv://${user}:${password}@travelapp.ldzsh31.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=travelapp`

  const server = Hapi.server({
    port: 8080,
    host: '0.0.0.0',
  })

  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url: url,
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  })

  server.route(routes)

  await server.start()
  console.log(`Server is running on ${server.info.uri}`)
}

init()
