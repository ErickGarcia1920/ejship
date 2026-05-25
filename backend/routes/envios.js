const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const jwt = require('jsonwebtoken')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token requerido' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}

const generarTracking = () => {
  return 'EJS' + Date.now() + Math.floor(Math.random() * 1000)
}

router.post('/', verificarToken, async (req, res) => {
  try {
    const { descripcion } = req.body
    const tracking = generarTracking()
    const envio = await prisma.envio.create({
      data: {
        tracking,
        descripcion,
        clienteId: req.usuario.id,
        estados: {
          create: { estado: 'REGISTRADO', nota: 'Envío registrado en el sistema' }
        }
      },
      include: { estados: true }
    })
    res.json(envio)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear envío' })
  }
})

router.get('/tracking/:codigo', async (req, res) => {
  try {
    const envio = await prisma.envio.findUnique({
      where: { tracking: req.params.codigo },
      include: { estados: true }
    })
    if (!envio) return res.status(404).json({ error: 'Envío no encontrado' })
    res.json(envio)
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar envío' })
  }
})

router.get('/mis-envios', verificarToken, async (req, res) => {
  try {
    const envios = await prisma.envio.findMany({
      where: { clienteId: req.usuario.id },
      include: { estados: true }
    })
    res.json(envios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener envíos' })
  }
})

router.put('/:id/estado', verificarToken, async (req, res) => {
  try {
    const { estado, nota } = req.body
    const envio = await prisma.envio.update({
      where: { id: parseInt(req.params.id) },
      data: { estado }
    })
    await prisma.estadoEnvio.create({
      data: { envioId: envio.id, estado, nota }
    })
    res.json(envio)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' })
  }
})

module.exports = router