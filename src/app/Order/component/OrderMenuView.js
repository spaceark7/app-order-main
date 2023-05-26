import { HStack, VStack } from 'native-base'
import { memo } from 'react'
import { View, Text } from 'react-native'

const OrderMenuView = ({ itemWidth, menu, isConfirm }) => {
  return (
    <HStack
      style={{
        width: itemWidth - 12,
      }}
      className='rounded-lg py-4   border border-t-0 border-x-0 border-b-gray-200 '
    >
      <VStack space={1} className='flex-1 w-full px-2'>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text className='font-bold'>
            {isConfirm ? menu.menu_name : menu.name}
          </Text>
          <View className='flex-row'>
            <Text className='font-bold'>{menu.qty}</Text>
          </View>
        </HStack>
      </VStack>
    </HStack>
  )
}

//default props here
OrderMenuView.defaultProps = {
  isConfirm: false,
}

export default memo(OrderMenuView)
