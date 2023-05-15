import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import Route from 'routes'
import store from 'store'
import 'react-native-gesture-handler'
// import Route from 'routes'

import { theme } from 'theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            <GestureHandlerRootView
              style={{
                flex: 1,
              }}
            >
              <Route />
            </GestureHandlerRootView>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
