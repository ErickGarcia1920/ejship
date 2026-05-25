const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const usuario = await prisma.usuario.create({
      data: { nombre, correo, password: hashedPassword, rol }
    })
    res.json({ message: 'Usuario creado', id: usuario.id })
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body
    const usuario = await prisma.usuario.findUnique({ where: { correo } })
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })
    const valid = await bcrypt.compare(password, usuario.password)
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' })
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } })
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

module.exports = router