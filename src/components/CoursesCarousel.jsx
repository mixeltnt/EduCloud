import { useEffect, useState } from 'react'
import { cursosApi } from '../api/educloud'

export default function CoursesCarousel() {
  const [courses, setCourses] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cursosApi.list()
      .then((res) => setCourses(res.datos || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (courses.length === 0) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % courses.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [courses.length])

  if (loading) {
    return (
      <section id='courses' className='section-block courses-section'>
        <div className='container text-center py-5'>
          <div className='spinner-border text-primary' role='status'></div>
        </div>
      </section>
    )
  }

  if (courses.length === 0) {
    return (
      <section id='courses' className='section-block courses-section'>
        <div className='container'>
          <div className='section-heading'>
            <p className='section-kicker'>Cursos destacados</p>
            <h2>Elige una ruta y avanza con proyectos guiados</h2>
          </div>
          <p className='text-muted text-center'>Proximamente nuevos cursos</p>
        </div>
      </section>
    )
  }

  const goToCourse = (index) => setActiveIndex(index)
  const prevCourse = () => setActiveIndex((activeIndex - 1 + courses.length) % courses.length)
  const nextCourse = () => setActiveIndex((activeIndex + 1) % courses.length)
  const activeCourse = courses[activeIndex]

  const accentClass = activeCourse.categoria?.toLowerCase() === 'diseno' ? 'design'
    : activeCourse.categoria?.toLowerCase() === 'programacion' ? 'frontend'
    : 'backend'

  return (
    <section id='courses' className='section-block courses-section'>
      <div className='container'>
        <div className='section-heading'>
          <p className='section-kicker'>Cursos destacados</p>
          <h2>Elige una ruta y avanza con proyectos guiados</h2>
        </div>

        <div className={`course-carousel course-${accentClass}`}>
          <button className='carousel-control prev' type='button' onClick={prevCourse} aria-label='Curso anterior'>
            {'<'}
          </button>

          <article className='course-slide'>
            <div>
              <span className='badge rounded-pill text-bg-light'>{activeCourse.categoria}</span>
              <span className='badge rounded-pill text-bg-dark ms-2'>{activeCourse.nivel}</span>
            </div>
            <h3>{activeCourse.nombre}</h3>
            <p>{activeCourse.descripcion}</p>
            <span className='badge bg-primary'>{activeCourse.duracion}</span>
          </article>

          <button className='carousel-control next' type='button' onClick={nextCourse} aria-label='Curso siguiente'>
            {'>'}
          </button>
        </div>

        <div className='carousel-indicators-custom' aria-label='Indicadores del carrusel'>
          {courses.map((course, index) => (
            <button
              className={index === activeIndex ? 'active' : ''}
              key={course._id}
              type='button'
              aria-label={`Ver ${course.nombre}`}
              onClick={() => goToCourse(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}
