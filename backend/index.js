const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
const envioRoutes = require('./routes/envios')

app.use('/api/auth', authRoutes)
app.use('/api/envios', envioRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'EJShip API funcionando' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

module.exports = app