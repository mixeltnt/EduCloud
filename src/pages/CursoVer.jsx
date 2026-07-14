import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { cursosApi } from '../api/educloud'

export default function CursoVer() {
  const { id } = useParams()
  const [curso, setCurso] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cursosApi.get(id)
      .then((res) => setCurso(res.datos || res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="alert alert-danger">{error}</div>
        <Link className="btn btn-primary" to="/admin/cursos">Volver a cursos</Link>
      </div>
    )
  }

  if (!curso) {
    return (
      <div className="admin-section">
        <div className="alert alert-warning">Curso no encontrado</div>
        <Link className="btn btn-primary" to="/admin/cursos">Volver a cursos</Link>
      </div>
    )
  }

  const data = curso._id ? curso : curso

  return (
    <div className="admin-section">
      <div className="mb-4">
        <Link to="/admin/cursos" className="text-decoration-none">&larr; Volver a cursos</Link>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">{data.nombre}</h3>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-primary btn-sm" to={`/admin/cursos/${id}/editar`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" to={`/admin/cursos/${id}/eliminar`}>Eliminar</Link>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5>Descripcion</h5>
              <p>{data.descripcion}</p>
            </div>
            <div className="col-md-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Categoria</strong>
                  <span className="badge bg-info">{data.categoria}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Nivel</strong>
                  <span>{data.nivel}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Duracion</strong>
                  <span>{data.duracion}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>ID</strong>
                  <small className="text-muted">{data._id}</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
