import { useState } from 'react'

// Preguntas frecuentes que se renderizan dentro del acordeon.
const faqs = [
  {
    question: 'Necesito experiencia previa para entrar?',
    answer: 'No. Tenemos rutas desde cero y un diagnostico inicial para recomendarte el mejor punto de partida.'
  },
  {
    question: 'Las clases quedan grabadas?',
    answer: 'Si. Puedes ver las grabaciones, descargar recursos y revisar ejercicios cuando quieras desde la plataforma.'
  },
  {
    question: 'Recibo certificado al finalizar?',
    answer: 'Si completas los proyectos y evaluaciones de la ruta, recibes un certificado digital de EduCloud.'
  }
]

export default function FAQAccordion() {
  // Guarda el indice de la pregunta abierta. -1 significa que todas estan cerradas.
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section id='faq' className='section-block faq-section'>
      <div className='container'>
        <div className='section-heading'>
          <p className='section-kicker'>Preguntas frecuentes</p>
          <h2>Todo claro antes de comenzar</h2>
        </div>

        <div className='accordion' id='eduFaq'>
          {faqs.map((faq, index) => {
            // Esta variable decide si se agrega la clase show de Bootstrap.
            const isOpen = openIndex === index

            return (
              <div className='accordion-item' key={faq.question}>
                <h3 className='accordion-header'>
                  <button
                    className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                    type='button'
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                  <div className='accordion-body'>{faq.answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
