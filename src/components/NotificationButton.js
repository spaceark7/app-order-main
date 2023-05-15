import { View, Text } from 'react-native'
import React from 'react'
import { Badge, IconButton, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { useGetNotificationsQuery } from 'api/notificationApi'

const NotificationButton = () => {
  const { data: notification } = useGetNotificationsQuery()

  return (
    <VStack>
      <Badge
        colorScheme='secondary'
        rounded='full'
        mb={-6}
        mr={notification?.length > 9 ? -2 : -1}
        zIndex={1}
        variant={'solid'}
        alignSelf='flex-end'
        _text={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}
      >
        {notification?.length}
      </Badge>
      <IconButton
        variant='ghost'
        rounded='full'
        _icon={{
          as: MaterialIcons,
          name: 'notifications-none',
          color: 'black',
          size: 'xl',
        }}
      />
    </VStack>
  )
}

export default NotificationButton
