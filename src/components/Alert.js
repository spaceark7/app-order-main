import { Text } from 'react-native'
import React from 'react'
import {
  Alert as NBAlert,
  CloseIcon,
  HStack,
  IconButton,
  VStack,
} from 'native-base'

const Alert = ({ message, status }) => {
  return (
    <NBAlert w='100%' status={status}>
      <VStack space={2} flexShrink={1} w='100%'>
        <HStack flexShrink={1} space={2} justifyContent='space-between'>
          <HStack space={2} flexShrink={1}>
            <NBAlert.Icon mt='1' />
            <Text fontSize='md' color='coolGray.800'>
              {message}
            </Text>
          </HStack>
          <IconButton
            variant='unstyled'
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size='3' />}
            _icon={{
              color: 'coolGray.600',
            }}
          />
        </HStack>
      </VStack>
    </NBAlert>
  )
}

// default props
Alert.defaultProps = {
  message: 'Error',
  status: 'error',
}

export default Alert
