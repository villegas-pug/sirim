import axios from 'axios'

import { ENDPOINT } from 'constants/'

export const api = axios.create({
   baseURL: ENDPOINT.PROD,
   headers: {
      'Content-Type': 'application/json'
   },
   timeout: ((1000 * 60) * 60) * 3
})
