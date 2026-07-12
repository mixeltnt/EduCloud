import { useEffect, useState } from 'react'

// Cada objeto representa una diapositiva del carrusel.
const courses = [
  {
    title: 'Frontend con React',
    category: 'Programacion',
    level: 'Intermedio',
    text: 'Componentes, hooks, consumo de APIs y despliegue con Vite.',
    accent: 'frontend'
  },
  {
    title: 'UX/UI desde cero',
    category: 'Diseno',
    level: 'Inicial',
    text: 'Investigacion, wireframes, prototipos en Figma y pruebas con usuarios.',
    accent: 'design'
  },
  {
    title: 'Backend con Node',
    category: 'Programacion',
    level: 'Intermedio',
    text: 'APIs REST, bases de datos, autenticacion y buenas practicas.',
    accent: 'backend'
  }
]

export default function CoursesCarousel() {
  // Guarda la posicion del curso que se esta mostrando.
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // Cambia automaticamente de curso cada 4.5 segundos.
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % courses.length)
    }, 4500)

    // Limpia el intervalo cuando el componente se desmonta.
    return () => clearInterval(timer)
  }, [])

  const goToCourse = (index) => setActiveIndex(index)
  // El modulo evita que el indice se salga del arreglo.
  const prevCourse = () => setActiveIndex((activeIndex - 1 + courses.length) % courses.length)
  const nextCourse = () => setActiveIndex((activeIndex + 1) % courses.length)
  const activeCourse = courses[activeIndex]

  return (
    <section id='courses' className='section-block courses-section'>
      <div className='container'>
        <div className='section-heading'>
          <p className='section-kicker'>Cursos destacados</p>
          <h2>Elige una ruta y avanza con proyectos guiados</h2>
        </div>

        <div className={`course-carousel course-${activeCourse.accent}`}>
          <button className='carousel-control prev' type='button' onClick={prevCourse} aria-label='Curso anterior'>
            {'<'}
          </button>

          <article className='course-slide'>
            <div>
              <span className='badge rounded-pill text-bg-light'>{activeCourse.category}</span>
              <span className='badge rounded-pill text-bg-dark ms-2'>{activeCourse.level}</span>
            </div>
            <h3>{activeCourse.title}</h3>
            <p>{activeCourse.text}</p>
            <a className='btn btn-light' href='#footer'>Recibir programa</a>
          </article>

          <button className='carousel-control next' type='button' onClick={nextCourse} aria-label='Curso siguiente'>
            {'>'}
          </button>
        </div>

        <div className='carousel-indicators-custom' aria-label='Indicadores del carrusel'>
          {/* Indicadores manuales para saltar directamente a un curso. */}
          {courses.map((course, index) => (
            <button
              className={index === activeIndex ? 'active' : ''}
              key={course.title}
              type='button'
              aria-label={`Ver ${course.title}`}
              onClick={() => goToCourse(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}
