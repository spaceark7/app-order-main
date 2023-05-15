import { Text } from 'react-native'
import React from 'react'
import { Avatar, HStack } from 'native-base'
import { useSelector } from 'react-redux'

const UserHeaderButton = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <HStack alignItems='center' space={3} py={4}>
      <Avatar size={'sm'} source={{ uri: user?.image }} />
      <Text className='text-lg font-bold'>Hello, {user?.name}!</Text>
    </HStack>
  )
}

export default UserHeaderButton
