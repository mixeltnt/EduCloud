import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cursosApi } from '../api/educloud'

export default function CursosLista() {
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cursosApi.list()
      .then((res) => setCursos(res.datos || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
  }

  return (
    <div className="admin-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Cursos</h2>
          <p className="text-muted mb-0">Listado de cursos disponibles</p>
        </div>
        <Link className="btn btn-primary" to="/admin/cursos/crear">+ Nuevo curso</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Nivel</th>
              <th>Duracion</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.length === 0 ? (
              <tr><td colSpan="5" className="text-center text-muted py-4">No hay cursos registrados</td></tr>
            ) : (
              cursos.map((curso) => (
                <tr key={curso._id}>
                  <td><strong>{curso.nombre}</strong><br /><small className="text-muted">{curso.descripcion}</small></td>
                  <td><span className="badge bg-info">{curso.categoria}</span></td>
                  <td>{curso.nivel}</td>
                  <td>{curso.duracion}</td>
                  <td className="text-end">
                    <Link className="btn btn-sm btn-outline-info me-1" to={`/admin/cursos/${curso._id}`}>Ver</Link>
                    <Link className="btn btn-sm btn-outline-primary me-1" to={`/admin/cursos/${curso._id}/editar`}>Editar</Link>
                    <Link className="btn btn-sm btn-outline-danger" to={`/admin/cursos/${curso._id}/eliminar`}>Eliminar</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
