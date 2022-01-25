import axios from 'axios'
import RootStore from 'stores/RootStore'

const axiosInterceptors = (rootStore: RootStore) => {
  // Handle all 403 requests
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status !== 403 && error?.response.status !== 422) {
        error.response.unknown = true
      }

      return Promise.reject(error)
    }
  )

  // Handle all 401 requests
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status !== 401) {
        rootStore.authStore.logout()
      }

      return Promise.reject(error)
    }
  )

  // Add Bearer to all API requests
  axios.interceptors.request.use(
    (config) => {
      if (config?.headers) {
        if (rootStore.authStore.isAuthenticated) {
          config.headers.Authorization = `Bearer ${rootStore?.authStore?.authUser?.token}`
        }

        config.headers['accept-language'] = 'en'
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Token update
  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.metadata?.token) {
        rootStore.authStore.updateToken(response.data.metadata.token.token)
      }
      return response
    },
    (error) => Promise.reject(error)
  )
}

export default axiosInterceptors
