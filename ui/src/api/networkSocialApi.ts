import axios from 'axios'

export const networkSocialApi = axios.create({
  baseURL: 'http://localhost:3000/'
})
