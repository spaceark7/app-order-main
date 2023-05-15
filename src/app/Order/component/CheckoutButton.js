import { useCreateOrderMutation } from 'api/orderApi'
import { Button } from 'native-base'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { clearTable } from 'app/Home/ModalSlice'
import { resetOrderInfo, setActiveOrder } from '../PickOrderSlice'
const CheckoutButton = () => {
  const [createOrder] = useCreateOrderMutation()
  const orderDetail = useSelector((state) => state.order.orderInfo)
  const menus = useSelector((state) => state.order.menus)
  const navigate = useNavigation()
  const dispatch = useDispatch()

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
      navigate.navigate('Home')
      dispatch(clearTable())
      dispatch(resetOrderInfo())
      dispatch(setActiveOrder(false))
    } else {
      alert('Checkout gagal')
      navigate.navigate('Home')
    }
  }

  return (
    <View>
      <Button onPress={handleCheckout}>Checkout</Button>
    </View>
  )
}

export default CheckoutButton
