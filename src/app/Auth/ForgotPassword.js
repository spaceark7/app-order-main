import { Platform, SafeAreaView, Text, View } from 'react-native'

import {
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  KeyboardAvoidingView,
  Stack,
} from 'native-base'
import { useRef, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { useLoginMutation } from 'api/loginApi'
import Alert from 'components/Alert'
import { setUser } from './AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import IPInput from 'components/IPInput'

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch()
  const [visibility, setVisibility] = useState(false)
  const passWordInput = useRef()
  const submitButton = useRef()
  const [errorMessage, setErrorMessage] = useState('')
  const [
    login,
    { isLoading, data: logData, status, isError, endpointName, error: err },
  ] = useLoginMutation({
    fixedCacheKey: 'auth',
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  const Submit = async (data) => {
    try {
      const payload = await login({
        email: 'kminchelle',
        password: '0lelplR',
      }).unwrap()

      dispatch(setUser(payload))

      // console.log('on login button:', payload)
    } catch (error) {
      console.log('error data:', error)
      setErrorMessage(error.data.message ? error.data.message : error.message)
    }
  }

  return (
    <KeyboardAvoidingView
      h={{ base: '100%', md: '100%' }}
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView className='flex-1 pt-12 px-8'>
        <View className='items-center flex-1 justify-around'>
          <View className='w-full space-y-12'>
            <Button
              className='self-start'
              onPress={() => navigation.goBack()}
              variant='unstyled'
            >
              Back
            </Button>
            <View>
              <Heading className='' size='lg'>
                Configure Connection IP and Port
              </Heading>

              <Text className='text-gray-400 max-w-sm'>
                Please make sure you entered the correct IP and Port. Invalid
                setting will cause application to break.
              </Text>
            </View>

            <Stack space={6}>
              <HStack space={6}>
                <IPInput />
                <View className='w-full'>
                  <FormControl>
                    <FormControl.Label>Port</FormControl.Label>
                    <Input keyboardType='numeric' />
                  </FormControl>
                </View>
              </HStack>
            </Stack>

            <Button
              ref={submitButton}
              className=' text-center font-bold'
              fontWeight='semiBold'
              isLoading={isLoading}
              isLoadingText='Loading'
              size={'sm'}
              //   onPress={handleSubmit(Submit)}
            >
              <Text className='text-white font-semibold'>
                SAVE CONFIGURATION
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword
