export default function Hero({ onRegisterClick }) {
  return (
    <section id='hero' className='hero-section'>
      <div className='container'>
        <div className='row align-items-center g-5'>
          <div className='col-lg-6'>
            <p className='hero-eyebrow'>Academia virtual de programacion y diseno</p>
            <h1 className='hero-title'>EduCloud</h1>
            <p className='hero-subtitle'>
              Aprende con rutas guiadas, clases en vivo y proyectos reales para
              construir tu portafolio desde la primera semana.
            </p>
            <div className='hero-actions'>
              <button className='btn btn-primary btn-lg' type='button' onClick={onRegisterClick}>
                Inscribirme gratis
              </button>
              <a className='btn btn-outline-dark btn-lg' href='#courses'>
                Ver cursos
              </a>
            </div>
          </div>
          <div className='col-lg-6'>
            {/* Bloque visual que simula una vista de la plataforma EduCloud. */}
            <div className='hero-dashboard' aria-label='Vista previa de plataforma EduCloud'>
              <div className='dashboard-top'>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className='dashboard-body'>
                <div className='lesson-panel'>
                  <span className='badge text-bg-success'>En vivo</span>
                  <h2>React + UX Lab</h2>
                  <p>Clase 04: componentes, estados y prototipos interactivos.</p>
                  {/* Barra Bootstrap para mostrar avance del curso. */}
                  <div className='progress' role='progressbar' aria-label='Progreso del curso' aria-valuenow='68' aria-valuemin='0' aria-valuemax='100'>
                    <div className='progress-bar' style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className='mini-grid'>
                  <div>HTML</div>
                  <div>Figma</div>
                  <div>React</div>
                  <div>CSS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
