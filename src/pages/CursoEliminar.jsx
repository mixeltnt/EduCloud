import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { cursosApi } from '../api/educloud'

export default function CursoEliminar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [curso, setCurso] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cursosApi.get(id)
      .then((res) => setCurso(res.datos || res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    setDeleting(true)
    setError('')
    try {
      await cursosApi.delete(id)
      navigate('/admin/cursos')
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
  }

  if (error && !curso) {
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

  return (
    <div className="admin-section">
      <div className="mb-4">
        <Link to={`/admin/cursos/${id}`} className="text-decoration-none">&larr; Volver al curso</Link>
        <h2 className="mb-1 mt-2">Eliminar curso</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card border-danger">
        <div className="card-header bg-danger text-white">
          <strong>Confirmacion requerida</strong>
        </div>
        <div className="card-body">
          <p className="mb-3">Estas seguro de eliminar el siguiente curso?</p>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Nombre:</strong> {curso.nombre}</li>
            <li className="list-group-item"><strong>Descripcion:</strong> {curso.descripcion}</li>
            <li className="list-group-item"><strong>Categoria:</strong> {curso.categoria}</li>
            <li className="list-group-item"><strong>Nivel:</strong> {curso.nivel}</li>
            <li className="list-group-item"><strong>Duracion:</strong> {curso.duracion}</li>
          </ul>
          <p className="text-danger small">Esta accion no se puede deshacer.</p>
          <div className="d-flex gap-2 justify-content-end">
            <Link className="btn btn-secondary" to={`/admin/cursos/${id}`}>Cancelar</Link>
            <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Eliminando...' : 'Si, eliminar curso'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
