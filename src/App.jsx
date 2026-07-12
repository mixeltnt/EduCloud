import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CoursesCarousel from './components/CoursesCarousel'
import FAQAccordion from './components/FAQAccordion'
import Footer from './components/Footer'
import Instructors from './components/Instructors'
import RegistrationModal from './components/RegistrationModal'
import './App.css'

export default function App() {
  // Estado centralizado para abrir y cerrar el modal desde Navbar y Hero.
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Navbar onRegisterClick={() => setShowModal(true)} />
      <main>
        <Hero onRegisterClick={() => setShowModal(true)} />
        <Features />
        <CoursesCarousel />
        <Instructors />
        <FAQAccordion />
      </main>
      <Footer />
      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
