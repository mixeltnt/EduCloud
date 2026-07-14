import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ onRegisterClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  const closeMenu = () => {
    setIsOpen(false)
    setCoursesOpen(false)
  }

  if (isAdmin) {
    return (
      <nav className='navbar navbar-expand-lg edu-navbar sticky-top'>
        <div className='container'>
          <Link className='navbar-brand edu-brand' to='/' onClick={closeMenu}>
            Edu<span>Cloud</span>
          </Link>
          <span className='badge bg-primary ms-2'>Admin</span>
          <button
            className='navbar-toggler'
            type='button'
            aria-controls='eduNavbar'
            aria-expanded={isOpen}
            aria-label='Abrir menu'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id='eduNavbar'>
            <ul className='navbar-nav ms-auto align-items-lg-center gap-lg-2'>
              <li className='nav-item'>
                <Link className='nav-link' to='/admin/cursos' onClick={closeMenu}>Cursos</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/admin/inscripciones' onClick={closeMenu}>Inscripciones</Link>
              </li>
              <li className='nav-item'>
                <Link className='btn btn-outline-primary' to='/' onClick={closeMenu}>Ver sitio</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className='navbar navbar-expand-lg edu-navbar sticky-top'>
      <div className='container'>
        <a className='navbar-brand edu-brand' href='#hero' onClick={closeMenu}>
          Edu<span>Cloud</span>
        </a>

        <button
          className='navbar-toggler'
          type='button'
          aria-controls='eduNavbar'
          aria-expanded={isOpen}
          aria-label='Abrir menu'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id='eduNavbar'>
          <ul className='navbar-nav ms-auto align-items-lg-center gap-lg-2'>
            <li className='nav-item'>
              <a className='nav-link' href='#hero' onClick={closeMenu}>Inicio</a>
            </li>
            <li className='nav-item dropdown'>
              <button
                className={`nav-link dropdown-toggle btn btn-link ${coursesOpen ? 'show' : ''}`}
                type='button'
                aria-expanded={coursesOpen}
                onClick={() => setCoursesOpen(!coursesOpen)}
              >
                Cursos
              </button>
              <ul className={`dropdown-menu ${coursesOpen ? 'show' : ''}`}>
                <li><a className='dropdown-item' href='#courses' onClick={closeMenu}>Programacion web</a></li>
                <li><a className='dropdown-item' href='#courses' onClick={closeMenu}>Diseno UX/UI</a></li>
                <li><a className='dropdown-item' href='#courses' onClick={closeMenu}>Datos y automatizacion</a></li>
              </ul>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#instructors' onClick={closeMenu}>Instructores</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#faq' onClick={closeMenu}>FAQs</a>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/admin/cursos' onClick={closeMenu}>Admin</Link>
            </li>
            <li className='nav-item'>
              <button
                className='btn btn-primary edu-nav-cta'
                type='button'
                onClick={() => {
                  closeMenu()
                  onRegisterClick()
                }}
              >
                Registrarme
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
