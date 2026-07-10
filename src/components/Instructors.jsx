// Datos de instructores. Cambiar aqui actualiza automaticamente las tarjetas.
const instructors = [
  {
    name: 'Paulo  Taipe ',
    role: 'Frontend mentor',
    initials: 'PT',
    bio: 'Especialista en React, accesibilidad y sistemas de componentes.'
  },
  {
    name: 'Diego Torres',
    role: 'Product designer',
    initials: 'DT',
    bio: 'Guia proyectos de UX research, prototipado y design systems.'
  },
  {
    name: 'Valentina Soto',
    role: 'Backend mentor',
    initials: 'VS',
    bio: 'Trabaja con APIs, Node.js, bases de datos y arquitectura cloud.'
  }
]

export default function Instructors() {
  return (
    <section id='instructors' className='section-block instructors-section'>
      <div className='container'>
        <div className='section-heading'>
          <p className='section-kicker'>Equipo docente</p>
          <h2>Instructores activos en la industria</h2>
        </div>
        <div className='row g-4'>
          {/* Bootstrap col-md-4 muestra 3 columnas en tablet/escritorio y 1 en movil. */}
          {instructors.map((instructor) => (
            <div className='col-md-4' key={instructor.name}>
              <article className='instructor-card h-100'>
                <div className='instructor-avatar'>{instructor.initials}</div>
                <h3>{instructor.name}</h3>
                <p className='instructor-role'>{instructor.role}</p>
                <p>{instructor.bio}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
