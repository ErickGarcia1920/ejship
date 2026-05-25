const request = require('supertest')
const app = require('../index')

describe('Auth API', () => {
  test('POST /api/auth/register - crear usuario exitosamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Test User',
        correo: `test${Date.now()}@test.com`,
        password: '123456',
        rol: 'cliente'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('id')
  })

  test('POST /api/auth/login - login fallido usuario no existe', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        correo: 'noexiste@test.com',
        password: 'wrongpass'
      })
    expect(res.statusCode).toBe(404)
  })

  test('POST /api/auth/login - login exitoso', async () => {
    const correo = `login${Date.now()}@test.com`
    await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'Login User', correo, password: '123456', rol: 'cliente' })
    const res = await request(app)
      .post('/api/auth/login')
      .send({ correo, password: '123456' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  test('POST /api/auth/login - password incorrecta', async () => {
    const correo = `pass${Date.now()}@test.com`
    await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'Pass User', correo, password: '123456', rol: 'cliente' })
    const res = await request(app)
      .post('/api/auth/login')
      .send({ correo, password: 'wrongpass' })
    expect(res.statusCode).toBe(401)
  })

  test('GET /api/envios/mis-envios - sin token retorna 401', async () => {
    const res = await request(app)
      .get('/api/envios/mis-envios')
    expect(res.statusCode).toBe(401)
  })

  test('GET /api/envios/tracking/INVALIDO - tracking no encontrado', async () => {
    const res = await request(app)
      .get('/api/envios/tracking/INVALIDO123')
    expect(res.statusCode).toBe(404)
  })
})