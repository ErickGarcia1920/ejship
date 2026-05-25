import { useState } from 'react'
import axios from 'axios'

export default function Tracking() {
  const [codigo, setCodigo] = useState('')
  const [envio, setEnvio] = useState(null)
  const [error, setError] = useState('')

  const buscarTracking = async () => {
    try {
      setError('')
      setEnvio(null)
      const res = await axios.get(`http://localhost:3000/api/envios/tracking/${codigo}`)
      setEnvio(res.data)
    } catch {
      setError('Envío no encontrado')
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '100px auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>EJShip - Consultar Tracking</h2>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <input
          placeholder="Ingresa tu número de tracking"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          style={{ flex: 1, padding: 8, marginRight: 10 }}
        />
        <button onClick={buscarTracking} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Buscar
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {envio && (
        <div style={{ border: '1px solid #dee2e6', padding: 20, borderRadius: 8 }}>
          <h3>Información del envío</h3>
          <p><strong>Tracking:</strong> {envio.tracking}</p>
          <p><strong>Descripción:</strong> {envio.descripcion}</p>
          <p><strong>Estado actual:</strong> {envio.estado}</p>
          <h4>Historial de estados</h4>
          {envio.estados.map((e, i) => (
            <div key={i} style={{ background: '#f8f9fa', padding: 10, marginBottom: 8, borderRadius: 4 }}>
              <p><strong>{e.estado}</strong> - {new Date(e.createdAt).toLocaleString()}</p>
              {e.nota && <p>{e.nota}</p>}
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: 20 }}><a href="/">Volver al inicio</a></p>
    </div>
  )
}