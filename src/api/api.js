import axios from 'axios'

const base_url = 'http://192.168.1.250:8081/apporder/Api'

export const api = axios.create({
  baseURL: base_url,
})

export { base_url }
