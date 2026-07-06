import axios from 'axios'

const API = axios.create({
  baseURL: 'https://konstrukt-api-production.up.railway.app',
  headers: { 'Content-Type': 'application/json' },
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (r) => r.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

export default API
