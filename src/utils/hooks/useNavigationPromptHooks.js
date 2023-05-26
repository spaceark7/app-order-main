import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const useNavigationPrompt = (
  isActive,
  alertTitle,
  alertMessage,
  customDispatches
) => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isActive) {
        return
      }

      e.preventDefault()

      Alert.alert(alertTitle, alertMessage, [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            customDispatches.forEach((dispatch) => dispatch())
          },
        },
      ])
    })

    return unsubscribe
  }, [isActive, navigation, alertTitle, alertMessage])

  return null
}

export default useNavigationPrompt
