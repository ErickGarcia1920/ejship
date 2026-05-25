import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { correo, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
      navigate('/dashboard')
    } catch {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>EJShip - Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Entrar
      </button>
      <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      <p>Consultar tracking: <a href="/tracking">aquí</a></p>
    </div>
  )
}