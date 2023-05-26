import { selectIP } from 'app/config/ConfigSlice'
import { FormControl, Input } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

const IPInput = () => {
  const ip = useSelector(selectIP)
  console.log('ip:', ip)
  const [ipAddress, setIPAddress] = useState('')

  const formatIPAddress = (text) => {
    // Remove any non-numeric characters except dots
    const sanitizedText = text.replace(/[^\d.]/g, '')

    setIPAddress(sanitizedText)
  }
  return (
    <View className='flex-1'>
      <FormControl>
        <FormControl.Label>IP Address</FormControl.Label>
        <Input
          variant={'filled'}
          value={ipAddress}
          onChangeText={formatIPAddress}
          placeholder='Enter IP Address'
          keyboardType='numeric'
        />
      </FormControl>
    </View>
  )
}

export default IPInput
