import { Button, HStack, VStack } from 'native-base'
import { View, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetOrderInfo,
  selectAddOrder,
  selectAllMenu,
  setActiveOrder,
  setAddOrder,
} from './PickOrderSlice'
import OrderDetailListView from './component/OrderDetailListView'
import { useAddNewOrderMutation, useCreateOrderMutation } from 'api/orderApi'
import { useNavigation } from '@react-navigation/native'
import { clearTable } from 'app/Home/ModalSlice'

const ConfirmOrder = () => {
  const [createOrder, { isLoading: newOrderLoading }] = useCreateOrderMutation()
  const [addNewOrder, { isLoading: addOrderLoading }] = useAddNewOrderMutation()
  const orderDetail = useSelector((state) => state.order.orderInfo)
  const menus = useSelector(selectAllMenu)
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const isAddOrder = useSelector(selectAddOrder)

  const handleCheckout = async () => {
    const order = {
      ...orderDetail,
      order_detail: menus.map((menu) => ({
        menu_id: menu.id,
        qty: menu.qty,
      })),
    }

    const payload = await createOrder({
      sales_date: order.sales_date,
      table_id: order.table_id,
      guest_name: order.guest_name,
      guest_no: order.guest_no,
      device_name: order.device_name,
      order_detail: order.order_detail,
    }).unwrap()

    if (payload.status) {
      Alert.alert('Order berhasil dibuat', payload.message)
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
      navigate.navigate('Home')
    } else {
      console.log('failed: ', payload)
      Alert.alert('Order gagal dibuat!', payload.message)
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))

      navigate.navigate('Home')
    }
  }

  const handleaddOrder = async () => {
    const addOrder = {
      ...orderDetail,
      order_detail: menus.map((menu) => ({
        menu_id: menu.id,
        qty: menu.qty,
      })),
    }

    const payload = await addNewOrder({
      sales_date: addOrder.sales_date,
      table_id: addOrder.table_id,
      device_name: addOrder.device_name,
      order_detail: addOrder.order_detail,
    }).unwrap()

    if (payload.status) {
      Alert.alert('Order berhasil ditambahkan.', payload.message)
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
      dispatch(setAddOrder(false))
      navigate.navigate('Home')
    } else {
      console.log(payload)
      Alert.alert('Order gagal dibuat', payload.message)
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
      dispatch(setAddOrder(false))
      navigate.navigate('Home')
    }
  }

  return (
    <View className='flex-1 bg-white  pb-4'>
      <View className='px-4 flex-1'>
        <View className='flex-1'>
          <HStack className='rounded-lg py-4 bg-gray-200   border border-t-0 border-x-0 border-b-gray-200 '>
            <VStack space={1} className='flex-1 w-full px-2'>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text className='font-bold sm:text-lg'>Menu</Text>
                <View className='flex-row'>
                  <Text className='font-medium sm:text-lg'>Ordered Qty</Text>
                </View>
              </HStack>
            </VStack>
          </HStack>
          {/* {isLoading && (
            <View className='justify-around flex-1 gap-y-4 w-full py-4'>
              <HStack space={2} justifyContent='center'>
                <Spinner size={'lg'} accessibilityLabel='Loading data' />
                <Heading color='primary' fontSize='md'>
                  Fetching Order data
                </Heading>
              </HStack>
            </View>
          )} */}
          {menus && <OrderDetailListView isConfirm={true} menus={menus} />}
        </View>
      </View>
      {menus && (
        <View className='px-4'>
          <Button
            onPress={isAddOrder ? handleaddOrder : handleCheckout}
            title='Make Order'
            isLoading={newOrderLoading || addOrderLoading}
          >
            Make Order
          </Button>
        </View>
      )}
    </View>
  )
}

export default ConfirmOrder
