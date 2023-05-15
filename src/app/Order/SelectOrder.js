import { useGetMenuQuery } from '@api/menuApi'
import { MaterialIcons } from '@expo/vector-icons'
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Skeleton,
  VStack,
} from 'native-base'
import { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, BackHandler, Alert } from 'react-native'
import MenuListView from './component/MenuListView'
import { useDispatch, useSelector } from 'react-redux'
import { resetOrderInfo } from './PickOrderSlice'

const SelectOrder = ({ route, navigation }) => {
  const {
    data: menus,
    isSuccess,
    isFetching,
    isLoading,
    isError,
    error,
  } = useGetMenuQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const dispatch = useDispatch()
  const [selectedGroup, setSelectedGroup] = useState()
  const [selectedMenu, setSelectedMenu] = useState()

  const isActiveOrder = useSelector((state) => state.order.isActive)

  const handleGroupChange = (menu) => {
    setSelectedGroup(menu.group_name)
    setSelectedMenu(menu.menus)
  }

  const resetOrder = () => {
    dispatch(resetOrderInfo())
    navigation.goBack()
  }

  const backAction = () => {
    Alert.alert('Discard changes?', 'Are you sure you want to exit?', [
      {
        text: 'NO',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: resetOrder },
    ])
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Select Order',
    })

    if (isSuccess) {
      setSelectedGroup(menus[0].group_name)
      setSelectedMenu(menus[0].menus)
    }
  }, [navigation, isSuccess])

  return (
    <View className='bg-white flex-1'>
      <Text>Order Screen</Text>
      <Text>Table : {route.params.tableName}</Text>
      <Text>Guest : {route.params.guestNo}</Text>
      <Text>ID : {route.params.tableId}</Text>
      <VStack className='px-4 py-4' space={3}>
        <FormControl>
          <Input
            returnKeyLabel='done'
            returnKeyType='done'
            InputLeftElement={
              <Icon as={<MaterialIcons name='search' />} size={5} ml={2.5} />
            }
            rounded='full'
            onSubmitEditing={() => {}}
            placeholder='Search by menu'
            variant='filled'
          />
        </FormControl>

        {isLoading && (
          <View className='flex-row items-center flex-wrap gap-x-1 w-full'>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                rounded='full'
                className='flex-1'
                height={6}
                key={index}
              />
            ))}
          </View>
        )}

        <ScrollView
          rounded='full'
          width={'100%'}
          className='h-fit'
          horizontal={true}
          alwaysBounceHorizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <HStack rounded='full' space={3}>
            <Button.Group variant='solid' rounded='full' space={3}>
              {isSuccess &&
                menus.map((menu, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedGroup === menu.group_name ? 'solid' : 'ghost'
                    }
                    colorScheme='primary'
                    rounded='full'
                    onPress={() => handleGroupChange(menu)}
                  >
                    {`${menu.group_name}`}
                  </Button>
                ))}
            </Button.Group>
          </HStack>
        </ScrollView>
      </VStack>
      <Box className='flex-1  px-4'>
        {isLoading && (
          <View className='flex-row items-center flex-wrap justify-around gap-x-3 gap-y-4 w-full py-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton rounded='md' width={'40%'} height={'30%'} key={index} />
            ))}
          </View>
        )}
        {isSuccess && <MenuListView menus={selectedMenu ?? menus[0].menus} />}
      </Box>
    </View>
  )
}

export default SelectOrder
