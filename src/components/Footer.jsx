import { useState } from 'react'

export default function Footer() {
  // Estados usados por el formulario del newsletter.
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleNewsletter = (event) => {
    event.preventDefault()

    // Validacion simple de correo antes de mostrar la confirmacion.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Ingresa un correo valido para suscribirte.')
      return
    }

    setMessage('Listo. Recibiras novedades y becas de EduCloud.')
    setEmail('')
  }

  return (
    <footer id='footer' className='footer'>
      <div className='container'>
        <div className='row g-4 align-items-start'>
          <div className='col-lg-4'>
            <span className='footer-logo'>Edu<span>Cloud</span></span>
            <p>Academia virtual para aprender programacion y diseno con proyectos reales.</p>
          </div>
          <div className='col-sm-6 col-lg-2'>
            <h2>Explorar</h2>
            <a href='#courses'>Cursos</a>
            <a href='#instructors'>Instructores</a>
            <a href='#faq'>FAQs</a>
          </div>
          <div className='col-sm-6 col-lg-2'>
            <h2>Contacto</h2>
            <p>hola@educloud.cl</p>
            <p>Santiago, Chile</p>
          </div>
          <div className='col-lg-4'>
            <h2>Newsletter</h2>
            <form className='newsletter-form' noValidate onSubmit={handleNewsletter}>
              <label className='visually-hidden' htmlFor='newsletter'>Correo electronico</label>
              <div className='input-group'>
                <input
                  className='form-control'
                  id='newsletter'
                  type='email'
                  placeholder='tu@email.com'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button className='btn btn-primary' type='submit'>Suscribirme</button>
              </div>
              {message && <p className='newsletter-message'>{message}</p>}
            </form>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>(c) {new Date().getFullYear()} EduCloud. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
