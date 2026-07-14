import { useEffect, useState } from 'react'
import { cursosApi } from '../api/educloud'

const initialForm = {
  name: '',
  email: '',
  courseId: '',
  courseName: '',
}

export default function RegistrationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [cursos, setCursos] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      cursosApi.list().then((res) => setCursos(res.datos || [])).catch(() => {})
    }
  }, [isOpen])

  const validate = () => {
    const nextErrors = {}
    if (formData.name.trim().length < 3) {
      nextErrors.name = 'Ingresa al menos 3 caracteres.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Ingresa un correo valido.'
    }
    if (!formData.courseId) {
      nextErrors.courseId = 'Selecciona un curso.'
    }
    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...formData, [name]: value }
    if (name === 'courseId') {
      const curso = cursos.find((c) => c._id === value)
      if (curso) next.courseName = curso.nombre
    }
    setFormData(next)
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaving(true)
    const inscripcion = {
      alumno: { nombre: formData.name, email: formData.email },
      cursoId: formData.courseId,
      cursoNombre: formData.courseName,
      fechaInscripcion: new Date().toISOString().split('T')[0],
      progreso: 0,
      estado: 'activa',
    }
    const stored = localStorage.getItem('educloud_inscripciones')
    const inscripciones = stored ? JSON.parse(stored) : []
    inscripciones.push(inscripcion)
    localStorage.setItem('educloud_inscripciones', JSON.stringify(inscripciones))
    setSaving(false)
    setSubmitted(true)
    setFormData(initialForm)
  }

  const handleClose = () => {
    setSubmitted(false)
    setErrors({})
    setFormData(initialForm)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className='modal fade show edu-modal' tabIndex='-1' role='dialog' aria-modal='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div>
                <p className='section-kicker mb-1'>Registro</p>
                <h2 className='modal-title'>Comienza en EduCloud</h2>
              </div>
              <button type='button' className='btn-close' aria-label='Cerrar' onClick={handleClose}></button>
            </div>

            <div className='modal-body'>
              {submitted ? (
                <div className='alert alert-success mb-0'>
                  Inscripcion registrada. Te contactaremos con el programa del curso.
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='form-label' htmlFor='name'>Nombre completo</label>
                    <input
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id='name'
                      name='name'
                      type='text'
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label' htmlFor='email'>Correo electronico</label>
                    <input
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                  </div>

                  <div className='mb-4'>
                    <label className='form-label' htmlFor='courseId'>Curso de interes</label>
                    <select
                      className={`form-select ${errors.courseId ? 'is-invalid' : ''}`}
                      id='courseId'
                      name='courseId'
                      value={formData.courseId}
                      onChange={handleChange}
                    >
                      <option value=''>Selecciona una opcion</option>
                      {cursos.map((c) => (
                        <option key={c._id} value={c._id}>{c.nombre}</option>
                      ))}
                    </select>
                    {errors.courseId && <div className='invalid-feedback'>{errors.courseId}</div>}
                  </div>

                  <button className='btn btn-primary w-100' type='submit' disabled={saving}>
                    {saving ? 'Registrando...' : 'Inscribirme gratis'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='modal-backdrop fade show'></div>
    </>
  )
}
