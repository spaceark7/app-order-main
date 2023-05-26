import { useAddNewOrderMutation, useCreateOrderMutation } from 'api/orderApi'
import { Button } from 'native-base'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { clearTable } from 'app/Home/ModalSlice'
import {
  resetOrderInfo,
  selectAddOrder,
  setActiveOrder,
  setAddOrder,
} from '../PickOrderSlice'
const CheckoutButton = () => {
  const [createOrder] = useCreateOrderMutation()
  const orderDetail = useSelector((state) => state.order.orderInfo)
  const menus = useSelector((state) => state.order.menus)
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const isAddOrder = useSelector(selectAddOrder)

  const [addNewOrder] = useAddNewOrderMutation()

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
      alert('Order berhasil dibuat')
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
      navigate.navigate('Home')
    } else {
      console.log(payload)
      alert(
        'Order gagal dibuat, silahkan cek kembali data yang anda masukkan',
        payload.message
      )
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
      alert('Order berhasil ditambahkan.', payload.message)

      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
      dispatch(setAddOrder(false))
      navigate.navigate('Home')
    } else {
      console.log(payload)
      alert({ title: 'Order gagal', message: payload.message })
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
      dispatch(setAddOrder(false))
      navigate.navigate('Home')
    }
  }

  const goToConfirmOrder = () => {
    // if (isAddOrder) {
    //   handleaddOrder()
    // } else {
    //   handleCheckout()
    // }
    navigate.navigate('confirm-order')
  }

  return (
    <View>
      <Button
        // onPress={isAddOrder ? handleaddOrder : handleCheckout}>
        onPress={goToConfirmOrder}
      >
        Checkout
      </Button>
    </View>
  )
}

export default CheckoutButton
