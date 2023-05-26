import { View, Text } from 'react-native'
import { Image } from 'native-base'

const NotFound = ({ message }) => {
  return (
    <View className='flex-1 py-8 items-center justify-center'>
      <Image
        source={require('../../assets/no_data.png')}
        alt={`${message} not found`}
        size={'lg'}
      />
      <Text className='text-xl mt-4'>{`Search for '${message}' is not found!`}</Text>
    </View>
  )
}

export default NotFound
