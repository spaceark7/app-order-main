import { useGetOrderdetailQuery } from 'api/orderApi'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetailListView from './component/OrderDetailListView'
import { Button, HStack, Heading, Spinner, VStack } from 'native-base'
import { setActiveOrder, setAddOrder, setOrderInfo } from './PickOrderSlice'
import { extractUserDeviceName } from 'utils/helper/extractUserDeviceName'
const OrderScreen = ({ route, navigation }) => {
  const { tableId, tableName } = route.params
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const {
    data: orderDetail,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderdetailQuery({
    table_name: tableName,
    device_name: user.device_name,
  })

  useEffect(() => {
    navigation.setOptions({
      title: route.params.tableName,
    })
  }, [navigation])

  const handleAddOrder = () => {
    dispatch(setAddOrder(true))
    const date = new Date()
    const YYYYMMDD = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate()}`

    dispatch(setActiveOrder(true))
    dispatch(
      setOrderInfo({
        sales_date: YYYYMMDD,
        table_id: tableId,
        device_name: user.device_name,
      })
    )
    navigation.navigate('select-order', {
      tableId: tableId,
      tableName: tableName,
      isAddOrder: true,
    })
  }

  return (
    <>
      {orderDetail?.message && !orderDetail.status ? (
        <View className='justify-center items-center flex-1 gap-y-4 w-full py-4'>
          <Text className='text-2xl font-bold'>Table is Busy!</Text>
          <Text>
            This table is opened by {extractUserDeviceName(orderDetail.message)}
            , please choose another table.
          </Text>
        </View>
      ) : (
        <View className='flex-1 bg-white  pb-4'>
          <View className='px-4 flex-1'>
            <Text className='text-lg sm:text-xl mb-4'>Recent Order </Text>
            <View className='flex-1'>
              <HStack className='rounded-lg py-4 bg-gray-200   border border-t-0 border-x-0 border-b-gray-200 '>
                <VStack space={1} className='flex-1 w-full px-2'>
                  <HStack
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Text className='font-bold sm:text-lg'>Menu</Text>
                    <View className='flex-row'>
                      <Text className='font-medium sm:text-lg'>
                        Ordered Qty
                      </Text>
                    </View>
                  </HStack>
                </VStack>
              </HStack>
              {isLoading && (
                <View className='justify-around flex-1 gap-y-4 w-full py-4'>
                  <HStack space={2} justifyContent='center'>
                    <Spinner size={'lg'} accessibilityLabel='Loading data' />
                    <Heading color='primary' fontSize='md'>
                      Fetching Order data
                    </Heading>
                  </HStack>
                </View>
              )}
              {isSuccess && <OrderDetailListView menus={orderDetail.detail} />}
            </View>
          </View>
          {isSuccess && (
            <View className='px-4'>
              <Button onPress={handleAddOrder} title='Add New Order'>
                Add New Order
              </Button>
            </View>
          )}
        </View>
      )}

      {isError && (
        <View className='justify-center items-center flex-1 gap-y-4 w-full py-4'>
          <Text className='text-2xl font-bold'>Error!</Text>
          <Text>{error}</Text>
        </View>
      )}
    </>
  )
}

export default OrderScreen
