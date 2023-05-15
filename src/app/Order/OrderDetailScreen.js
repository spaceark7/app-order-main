import { useEffect } from 'react'
import { View, Text } from 'react-native'

const OrderScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.tableName,
    })
  }, [navigation])
  return (
    <View>
      <Text>Order Screen</Text>
      <Text>ID : {route.params.tableId}</Text>
    </View>
  )
}

export default OrderScreen
