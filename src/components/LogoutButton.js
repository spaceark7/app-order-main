import React from 'react'
import { IconButton, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { useLogoutMutation } from 'api/loginApi'
import Alert from './Alert'

const LogoutButton = () => {
  const [logout, { isLoading, isSuccess }] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <VStack>
      {isLoading && <Alert message='On Logged Out' status='success' />}
      <IconButton
        variant='ghost'
        rounded='full'
        onPress={handleLogout}
        _icon={{
          as: MaterialIcons,
          name: 'logout',
          color: 'black',
          size: 'xl',
        }}
      />
    </VStack>
  )
}

export default LogoutButton
