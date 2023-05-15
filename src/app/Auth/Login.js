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
import { useLoginMutation } from 'api/loginApi'
import Alert from 'components/Alert'
import { setUser } from './AuthSlice'
import { useDispatch } from 'react-redux'

const logo = require('../../assets/serving-dish.png')

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [visibility, setVisibility] = useState(false)
  const [errorCI, setErrorCI] = useState(false)
  const passWordInput = useRef()
  const submitButton = useRef()
  const [errorMessage, setErrorMessage] = useState('')
  const [login, { isLoading, data: logData, status, isError, error: err }] =
    useLoginMutation({
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
        username: data.email,
        password: data.password,
      }).unwrap()

      console.log('payload:', payload)
      console.log('payload status:', !payload.status)

      if (!payload.status) {
        setErrorCI(true)
        setErrorMessage('Invalid credentials')
        throw new Error('Invalid credentials')
      }
      dispatch(setUser(payload))

      // console.log('on login button:', payload)
    } catch (error) {
      console.log('error data:', error)
      console.log('from query', isError)
      setErrorMessage(
        error.data?.message ??
          error.data?.message ??
          error?.message ??
          'Bad Connection'
      )
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
          <HStack space={3} alignItems='center' justifyContent='center'>
            <Image source={logo} alt='Logo' size='xs' />
            <Heading pt={4} className='text-center' size='lg'>
              App Order
            </Heading>
          </HStack>
          <View className='w-full space-y-8'>
            <View>
              <Heading className='text-center' size='lg'>
                Welcome!
              </Heading>

              <Text className='text-center text-gray-400'>
                Please login to continue
              </Text>
            </View>

            <Stack space={6}>
              {(isError || errorCI) && (
                <Alert message={errorMessage} status={'error'} />
              )}
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Email cannot be empty',
                  },
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message: 'Invalid email address',
                  // },
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
                      onBlur={onBlur}
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
              <Controller
                name='password'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Password cannot be empty',
                  },
                  min: 4,
                  minLength: {
                    value: 4,
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
              />
            </Stack>

            <Button
              ref={submitButton}
              className=' text-center font-bold'
              fontWeight='semiBold'
              isLoading={isLoading}
              isLoadingText='Loading'
              size={'sm'}
              onPress={handleSubmit(Submit)}
            >
              <Text className='text-white font-semibold'>LOGIN</Text>
            </Button>
            <Button
              onPress={() => navigation.navigate('ForgotPassword')}
              variant='ghost'
            >
              Forgot password?
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Login
