import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ nombre: '', correo: '', password: '', rol: 'cliente' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/register', form)
      setExito('Usuario creado exitosamente')
      setTimeout(() => navigate('/'), 2000)
    } catch {
      setError('Error al crear usuario')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>EJShip - Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>{exito}</p>}
      <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
      <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
      <select name="rol" value={form.rol} onChange={handleChange}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}>
        <option value="cliente">Cliente</option>
        <option value="repartidor">Repartidor</option>
        <option value="admin">Administrador</option>
      </select>
      <button onClick={handleRegister} style={{ width: '100%', padding: 10, background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
        Registrarse
      </button>
      <p>¿Ya tienes cuenta? <a href="/">Iniciar sesión</a></p>
    </div>
  )
}