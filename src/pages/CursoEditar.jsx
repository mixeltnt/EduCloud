import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { cursosApi } from '../api/educloud'

export default function CursoEditar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cursosApi.get(id)
      .then((res) => {
        const data = res.datos || res
        setForm({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          categoria: data.categoria || '',
          nivel: data.nivel || '',
          duracion: data.duracion || '',
        })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await cursosApi.update(id, form)
      navigate(`/admin/cursos/${id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
  }

  if (error && !form) {
    return (
      <div className="admin-section">
        <div className="alert alert-danger">{error}</div>
        <Link className="btn btn-primary" to="/admin/cursos">Volver a cursos</Link>
      </div>
    )
  }

  return (
    <div className="admin-section">
      <div className="mb-4">
        <Link to={`/admin/cursos/${id}`} className="text-decoration-none">&larr; Volver al curso</Link>
        <h2 className="mb-1 mt-2">Editar curso</h2>
        <p className="text-muted mb-0">Modifica los campos del curso</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre">Nombre del curso</label>
              <input className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="descripcion">Descripcion</label>
              <textarea className="form-control" id="descripcion" name="descripcion" rows="3" value={form.descripcion} onChange={handleChange} required />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="categoria">Categoria</label>
                <select className="form-select" id="categoria" name="categoria" value={form.categoria} onChange={handleChange} required>
                  <option value="">Selecciona</option>
                  <option value="Programacion">Programacion</option>
                  <option value="Diseno">Diseno</option>
                  <option value="Datos">Datos</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="nivel">Nivel</label>
                <select className="form-select" id="nivel" name="nivel" value={form.nivel} onChange={handleChange} required>
                  <option value="">Selecciona</option>
                  <option value="Inicial">Inicial</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="duracion">Duracion</label>
                <input className="form-control" id="duracion" name="duracion" placeholder="ej: 8 semanas" value={form.duracion} onChange={handleChange} required />
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <Link className="btn btn-secondary" to={`/admin/cursos/${id}`}>Cancelar</Link>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Guardando...' : 'Actualizar curso'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
