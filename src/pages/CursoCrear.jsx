import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { cursosApi } from '../api/educloud'

export default function CursoCrear() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    nivel: '',
    duracion: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await cursosApi.create(form)
      navigate('/admin/cursos')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-section">
      <div className="mb-4">
        <Link to="/admin/cursos" className="text-decoration-none">&larr; Volver a cursos</Link>
        <h2 className="mb-1 mt-2">Nuevo curso</h2>
        <p className="text-muted mb-0">Completa los campos para agregar un curso</p>
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
              <Link className="btn btn-secondary" to="/admin/cursos">Cancelar</Link>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar curso'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
