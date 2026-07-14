import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CoursesCarousel from './components/CoursesCarousel'
import FAQAccordion from './components/FAQAccordion'
import Footer from './components/Footer'
import Instructors from './components/Instructors'
import RegistrationModal from './components/RegistrationModal'
import CursosLista from './pages/CursosLista'
import CursoCrear from './pages/CursoCrear'
import CursoVer from './pages/CursoVer'
import CursoEditar from './pages/CursoEditar'
import CursoEliminar from './pages/CursoEliminar'
import AdminInscripciones from './pages/AdminInscripciones'
import './App.css'

function LandingPage({ onRegisterClick }) {
  return (
    <>
      <main>
        <Hero onRegisterClick={onRegisterClick} />
        <Features />
        <CoursesCarousel />
        <Instructors />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  )
}

function AdminLayout({ children }) {
  return (
    <section className="admin-layout">
      <div className="container py-5">
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <BrowserRouter>
      <Navbar onRegisterClick={() => setShowModal(true)} />
      <Routes>
        <Route path="/" element={<LandingPage onRegisterClick={() => setShowModal(true)} />} />
        <Route path="/admin/cursos" element={<AdminLayout><CursosLista /></AdminLayout>} />
        <Route path="/admin/cursos/crear" element={<AdminLayout><CursoCrear /></AdminLayout>} />
        <Route path="/admin/cursos/:id" element={<AdminLayout><CursoVer /></AdminLayout>} />
        <Route path="/admin/cursos/:id/editar" element={<AdminLayout><CursoEditar /></AdminLayout>} />
        <Route path="/admin/cursos/:id/eliminar" element={<AdminLayout><CursoEliminar /></AdminLayout>} />
        <Route path="/admin/inscripciones" element={<AdminLayout><AdminInscripciones /></AdminLayout>} />
      </Routes>
      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </BrowserRouter>
  )
}
