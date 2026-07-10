import { useState } from 'react'

/**
 * Modal de registro para los cursos de EduCloud.
 * Muestra un formulario, valida los campos y confirma el envio cuando los datos son correctos.
 */

// Estado inicial del formulario. Tambien se usa para limpiar los campos despues de enviar o cerrar el modal.
const initialForm = {
  name: '',
  email: '',
  interest: ''
}

export default function RegistrationModal({ isOpen, onClose }) {
  // Guarda los valores que el usuario escribe en el formulario.
  const [formData, setFormData] = useState(initialForm)

  // Guarda los mensajes de error de cada campo cuando la validacion falla.
  const [errors, setErrors] = useState({})

  // Indica si el formulario ya fue enviado correctamente.
  const [submitted, setSubmitted] = useState(false)

  // Valida los campos del formulario y devuelve un objeto con los errores encontrados.
  const validate = () => {
    const nextErrors = {}

    if (formData.name.trim().length < 3) {
      nextErrors.name = 'Ingresa al menos 3 caracteres.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Ingresa un correo valido.'
    }

    if (!formData.interest) {
      nextErrors.interest = 'Selecciona un curso.'
    }

    return nextErrors
  }

  // Actualiza el estado del formulario cada vez que el usuario escribe o selecciona una opcion.
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  // Procesa el envio del formulario: evita recargar la pagina, valida y muestra la confirmacion.
  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setFormData(initialForm)
    }
  }

  // Cierra el modal y deja sus estados listos para la proxima vez que se abra.
  const handleClose = () => {
    setSubmitted(false)
    setErrors({})
    setFormData(initialForm)
    onClose()
  }

  // Si el modal no esta abierto, no se renderiza nada en pantalla.
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
                  Registro enviado. Te contactaremos con el programa del curso.
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
                    <label className='form-label' htmlFor='interest'>Curso de interes</label>
                    <select
                      className={`form-select ${errors.interest ? 'is-invalid' : ''}`}
                      id='interest'
                      name='interest'
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value=''>Selecciona una opcion</option>
                      <option value='react'>Frontend con React</option>
                      <option value='uxui'>UX/UI desde cero</option>
                      <option value='node'>Backend con Node</option>
                    </select>
                    {errors.interest && <div className='invalid-feedback'>{errors.interest}</div>}
                  </div>

                  <button className='btn btn-primary w-100' type='submit'>
                    Enviar registro
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
