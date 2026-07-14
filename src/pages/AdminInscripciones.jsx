import { useEffect, useState } from 'react'
import { cursosApi } from '../api/educloud'

const initialForm = {
  alumnoNombre: '',
  alumnoEmail: '',
  cursoId: '',
  cursoNombre: '',
  fechaInscripcion: new Date().toISOString().split('T')[0],
  progreso: 0,
  estado: 'activa',
}

export default function AdminInscripciones() {
  const [cursos, setCursos] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    cursosApi.list()
      .then((res) => {
        setCursos(res.datos || [])
        const stored = localStorage.getItem('educloud_inscripciones')
        setInscripciones(stored ? JSON.parse(stored) : [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    if (name === 'cursoId') {
      const curso = cursos.find((c) => c._id === value)
      if (curso) next.cursoNombre = curso.nombre
    }
    setForm(next)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nueva = {
      ...form,
      alumno: { nombre: form.alumnoNombre, email: form.alumnoEmail },
    }
    delete nueva.alumnoNombre
    delete nueva.alumnoEmail
    const updated = [...inscripciones, nueva]
    setInscripciones(updated)
    localStorage.setItem('educloud_inscripciones', JSON.stringify(updated))
    setForm(initialForm)
    setShowForm(false)
  }

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>

  return (
    <div className="admin-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Inscripciones</h2>
          <p className="text-muted mb-0">Registro de alumnos inscritos en cursos</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Nueva inscripcion
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Nueva inscripcion</h5>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="alumnoNombre">Nombre del alumno</label>
                  <input className="form-control" id="alumnoNombre" name="alumnoNombre" value={form.alumnoNombre} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="alumnoEmail">Email</label>
                  <input className="form-control" id="alumnoEmail" name="alumnoEmail" type="email" value={form.alumnoEmail} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="cursoId">Curso</label>
                  <select className="form-select" id="cursoId" name="cursoId" value={form.cursoId} onChange={handleChange} required>
                    <option value="">Selecciona un curso</option>
                    {cursos.map((c) => (
                      <option key={c._id} value={c._id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="fechaInscripcion">Fecha inscripcion</label>
                  <input className="form-control" id="fechaInscripcion" name="fechaInscripcion" type="date" value={form.fechaInscripcion} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="estado">Estado</label>
                  <select className="form-select" id="estado" name="estado" value={form.estado} onChange={handleChange}>
                    <option value="activa">Activa</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="progreso">Progreso (%)</label>
                  <input className="form-control" id="progreso" name="progreso" type="number" min="0" max="100" value={form.progreso} onChange={handleChange} />
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-end mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Registrar inscripcion</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Alumno</th>
              <th>Email</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Progreso</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.length === 0 ? (
              <tr><td colSpan="6" className="text-center text-muted py-4">No hay inscripciones registradas</td></tr>
            ) : (
              inscripciones.map((ins, i) => (
                <tr key={i}>
                  <td><strong>{ins.alumno.nombre}</strong></td>
                  <td>{ins.alumno.email}</td>
                  <td>{ins.cursoNombre}</td>
                  <td>{ins.fechaInscripcion}</td>
                  <td>
                    <span className={`badge ${ins.estado === 'activa' ? 'bg-success' : ins.estado === 'completada' ? 'bg-info' : 'bg-danger'}`}>
                      {ins.estado}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: 8 }}>
                        <div className="progress-bar" style={{ width: `${ins.progreso}%` }}></div>
                      </div>
                      <small>{ins.progreso}%</small>
                    </div>
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
