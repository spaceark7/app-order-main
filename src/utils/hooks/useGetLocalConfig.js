import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

const useGetLocalConfig = () => {
  useEffect(() => {
    const getconfigFromSecureStore = async () => {
      try {
        const result = await SecureStore.getItemAsync('config')
        if (result) {
          const config = JSON.parse(result)
          return config
        }
      } catch (error) {
        console.log('error:', error)
      }
    }
    const config = getconfigFromSecureStore()

    if (config) {
      dispatch(setConfig(config))
    }

    return () => {
      cleanup
    }
  }, [])

  return (
    <View>
      <Text>useGetLocalConfig</Text>
    </View>
  )
}

export default useGetLocalConfig
