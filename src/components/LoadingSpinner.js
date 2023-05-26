import { HStack, Heading, Spinner } from 'native-base'
import { View } from 'react-native'

const LoadingSpinner = ({ message }) => {
  return (
    <View className='justify-around flex-1 gap-y-4 w-full py-4'>
      <HStack space={2} justifyContent='center'>
        <Spinner size={'lg'} accessibilityLabel='Loading data' />
        <Heading color='primary' fontSize='md'>
          {message}
        </Heading>
      </HStack>
    </View>
  )
}

export default LoadingSpinner
