import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [envios, setEnvios] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  useEffect(() => {
    if (!token) { navigate('/'); return }
    cargarEnvios()
  }, [])

  const cargarEnvios = async () => {
    try {
      const res = await axios.get('https://ejship-backend.onrender.com/api/envios/mis-envios', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEnvios(res.data)
    } catch {
      setError('Error al cargar envíos')
    }
  }

  const crearEnvio = async () => {
    try {
      await axios.post('https://ejship-backend.onrender.com/api/envios', { descripcion }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setDescripcion('')
      cargarEnvios()
    } catch {
      setError('Error al crear envío')
    }
  }

  const cerrarSesion = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20, fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Bienvenido, {usuario.nombre}</h2>
        <button onClick={cerrarSesion} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ background: '#f8f9fa', padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h3>Crear nuevo envío</h3>
        <input
          placeholder="Descripción del paquete"
          value={descripcion}
          onChange={ev => setDescripcion(ev.target.value)}
          style={{ width: '70%', padding: 8, marginRight: 10 }}
        />
        <button onClick={crearEnvio} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Crear Envío
        </button>
      </div>

      <h3>Mis envíos</h3>
      {envios.length === 0 && <p>No tienes envíos aún.</p>}
      {envios.map(envio => (
        <div key={envio.id} style={{ border: '1px solid #dee2e6', padding: 15, marginBottom: 10, borderRadius: 8 }}>
          <p><strong>Tracking:</strong> {envio.tracking}</p>
          <p><strong>Descripción:</strong> {envio.descripcion}</p>
          <p><strong>Estado:</strong> {envio.estado}</p>
          <p><strong>Fecha:</strong> {new Date(envio.createdAt).toLocaleDateString()}</p>
        </div>
      ))}

      <p style={{ marginTop: 20 }}>
        Consultar tracking público: <a href="/tracking">aquí</a>
      </p>
    </div>
  )
}