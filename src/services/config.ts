/* eslint-disable-next-line import/no-mutable-exports */
let API_URL = '/api'

if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:8080/api'
}

export default API_URL
