const BASE_URL = 'https://apiclases.inacode.cl/cursos'

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.mensaje || `Error ${res.status}`)
  }
  return res.json()
}

export const cursosApi = {
  list: () => request(''),

  get: (id) => request(`/${id}`),

  create: (data) =>
    request('', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/${id}`, {
      method: 'DELETE',
    }),
}

export const inscripcionesApi = {
  list: () => request('/cursos_inscripciones').catch(() => ({ datos: [] })),

  create: (data) => request('/cursos_inscripciones', { method: 'POST', body: JSON.stringify(data) }).catch(() => null),
}
