import { Platform, SafeAreaView, Text, View } from 'react-native'

import {
  Button,
  FormControl,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Stack,
} from 'native-base'
import { useRef, useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { LoginApi, useLoginMutation } from 'api/loginApi'
import Alert from 'components/Alert'
import { setUser } from './AuthSlice'
import { useDispatch } from 'react-redux'

const logo = require('../../assets/serving-dish.png')

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

    // console.log('login data:', logData)
    // console.log('loading:', isLoading)
    // console.log('errstatus:', isError)
    // console.log('error:', err)
    // console.log('status:', status)
    // console.log('endpoint:', endpointName)
    // const res = await LoginApi(data)
    // navigation.navigate('Home')
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
            <View>
              <Heading className='' size='lg'>
                Relax! We'll help you to recover
              </Heading>

              <Text className=' text-gray-400'>Please enter valid email</Text>
            </View>

            <Stack space={6}>
              {isError && <Alert message={errorMessage} status={'error'} />}
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Email cannot be empty',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl isInvalid={Boolean(errors.email)}>
                    <Input
                      returnKeyLabel='next'
                      returnKeyType='next'
                      onSubmitEditing={() => {
                        passWordInput.current.focus()
                      }}
                      value={value}
                      onChangeText={onChange}
                      onLoginBlur={onBlur}
                      placeholder='Email'
                      variant='filled'
                    />

                    <FormControl.ErrorMessage>
                      {errors?.email?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
                name='email'
              />
              {/* <Controller
                name='password'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Password cannot be empty',
                  },
                  min: 6,
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl isInvalid={Boolean(errors.password)}>
                    <Input
                      ref={passWordInput}
                      onSubmitEditing={() => {
                        submitButton.current.focus()
                      }}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Password'
                      variant='filled'
                      type={visibility ? 'text' : 'password'}
                      InputRightElement={
                        <Pressable onPress={handleVisibility}>
                          <Icon
                            as={MaterialIcons}
                            size={5}
                            mr={2}
                            name={visibility ? 'visibility-off' : 'visibility'}
                          />
                        </Pressable>
                      }
                    />
                    <FormControl.ErrorMessage>
                      {errors.password?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
              /> */}
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
                SEND VERIFICATION CODE
              </Text>
            </Button>
            <Button onPress={() => navigation.goBack()} variant='unstyled'>
              Back
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword
