import * as SecureStore from 'expo-secure-store'

export const getIPFromSecureStorage = async () => {
  try {
    const result = await SecureStore.getItemAsync('ip')
    if (result) {
      const ip = JSON.parse(result)
      console.log('parsed ip:', ip)
      return ip
    } else {
      return ' '
    }
  } catch (error) {
    console.log('error get IP:', error)
  }
}

export const getPortFromSecureStorage = async () => {
  try {
    const result = await SecureStore.getItemAsync('port')
    if (result) {
      const port = JSON.parse(result)
      return port
    } else {
      throw new Error('No Port found in SecureStorage')
    }
  } catch (error) {
    console.log('error get Port:', error)
    return '8081'
  }
}

export const setIPToSecureStorage = async (ip) => {
  try {
    await SecureStore.setItemAsync('ip', JSON.stringify(ip))
  } catch (error) {
    console.log('error:', error)
  }
}

export const setPortToSecureStorage = async (port) => {
  try {
    await SecureStore.setItemAsync('port', JSON.stringify(port))
  } catch (error) {
    console.log('error:', error)
  }
}
