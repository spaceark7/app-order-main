import { createStackNavigator } from '@react-navigation/stack'

import ForgotPassword from 'app/Auth/ForgotPassword'

import Login from 'app/Auth/Login'
import HomeScreen from 'app/Home/HomeScreen'
import ConfirmOrder from 'app/Order/ConfirmOrder'
import OrderScreen from 'app/Order/OrderDetailScreen'
import SelectOrder from 'app/Order/SelectOrder'
import CheckoutButton from 'app/Order/component/CheckoutButton'
import LogoutButton from 'components/LogoutButton'
// import NotificationButton from 'components/NotificationButton'
import UserHeaderButton from 'components/UserHeaderButton'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

const Route = () => {
  const { user } = useSelector((state) => state.auth)
  const isMenuNotEmpty = useSelector((state) => state.order.menus.length > 0)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
              animationTypeForReplace: user ? 'push' : 'pop',
              headerShown: true,
              gestureEnabled: true,
              title: null,
              headerLeft: () => <UserHeaderButton />,
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
              headerRight: () => <LogoutButton />,
              headerRightContainerStyle: {
                marginRight: 20,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name='order'
            component={OrderScreen}
            animationTypeForReplace='push'
            options={({ route }) => ({
              title: route.params.tableName,
              headerTitleAlign: 'center',
              headerShown: true,
              gestureEnabled: true,
            })}
          />
          <Stack.Screen
            name='select-order'
            component={SelectOrder}
            animationTypeForReplace='push'
            options={({ route }) => ({
              title: route.params.tableName,
              headerTitleAlign: 'center',
              headerShown: true,
              headerRight: isMenuNotEmpty && (() => <CheckoutButton />),
              headerRightContainerStyle: {
                marginRight: 20,
              },
            })}
          />
          <Stack.Screen
            name='confirm-order'
            component={ConfirmOrder}
            animationTypeForReplace='push'
            options={({ route }) => ({
              title: 'Confirm Order',
              headerTitleAlign: 'center',
              headerShown: true,
              gestureEnabled: true,
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              animationTypeForReplace: 'push',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPassword}
            options={{
              animationTypeForReplace: 'push',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Route
