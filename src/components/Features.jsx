// Arreglo de datos: permite crear tarjetas sin repetir JSX manualmente.
const features = [
  {
    icon: '01',
    title: 'Rutas por nivel',
    desc: 'Elige rutas de frontend, backend, UX/UI o fundamentos desde cero.'
  },
  {
    icon: '02',
    title: 'Proyectos reales',
    desc: 'Crea landing pages, dashboards, apps React y casos de diseno para tu portafolio.'
  },
  {
    icon: '03',
    title: 'Mentoria semanal',
    desc: 'Resuelve dudas con instructores y recibe feedback directo sobre tus entregas.'
  }
]

export default function Features() {
  return (
    <section id='features' className='section-block'>
      <div className='container'>
        <div className='section-heading'>
          <p className='section-kicker'>Metodo EduCloud</p>
          <h2>Aprendizaje practico, ordenado y acompanado</h2>
        </div>
        <div className='row g-4'>
          {features.map((feature) => (
            <div className='col-md-4' key={feature.title}>
              <article className='feature-card h-100'>
                <div className='feature-icon'>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
