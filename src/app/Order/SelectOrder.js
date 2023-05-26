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
import { useLayoutEffect, useMemo, useState } from 'react'
import { View, Text, Keyboard, FlatList } from 'react-native'
import MenuListView from './component/MenuListView'
import { useDispatch, useSelector } from 'react-redux'
import { resetOrderInfo } from './PickOrderSlice'
import LoadingSpinner from 'components/LoadingSpinner'
import useNavigationPrompt from 'utils/hooks/useNavigationPromptHooks'
import { useCallback } from 'react'

const SelectOrder = ({ route, navigation }) => {
  const {
    data: menus,
    isSuccess,
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
  const [search, setSearch] = useState('')

  const filterMenu = useMemo(() => {
    return selectedMenu?.filter((menu) =>
      menu.menu_name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, selectedMenu])

  const isActiveOrder = useSelector((state) => state.order.isActive)

  const handleGroupChange = useCallback(
    (menu) => {
      setSelectedGroup(menu.group_name)
      setSelectedMenu(menu.menus)
    },
    [selectedGroup, selectedMenu]
  )

  const resetOrder = () => {
    dispatch(resetOrderInfo())
    navigation.goBack()
  }

  useNavigationPrompt(
    isActiveOrder,
    'Discard changes?',
    'Are you sure you want to exit?',
    [resetOrder]
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Select Order',
    })

    if (isSuccess) {
      setSelectedGroup(menus[0].group_name)
      setSelectedMenu(menus[0].menus)
    }
  }, [navigation, isSuccess])

  const renderGroupItem = useCallback(
    ({ item }) => (
      <Button
        variant={selectedGroup === item.group_name ? 'solid' : 'ghost'}
        colorScheme='primary'
        rounded='full'
        onPress={() => handleGroupChange(item)}
      >
        {`${item.group_name}`}
      </Button>
    ),
    [selectedGroup]
  )

  return (
    <>
      {/* {orderDetail?.message && !orderDetail.status ? (
        <View className='justify-center items-center flex-1 gap-y-4 w-full py-4'>
          <Text className='text-2xl font-bold'>Table is Busy!</Text>
          <Text>
            This table is opened by {extractUserDeviceName(orderDetail.message)}
            , please choose another table.
          </Text>
        </View>
      ) : ( */}
      <View className='bg-white flex-1'>
        <HStack px={4} py={4} justifyContent='space-between'>
          <Text>{route.params.tableName}</Text>
          <Text>Guest : {route.params.guestNo}</Text>
        </HStack>

        <VStack className='px-4 py-4' space={3}>
          {isSuccess && (
            <FormControl className='py-2 md:py-6'>
              <Input
                returnKeyLabel='done'
                returnKeyType='done'
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name='search' />}
                    size={5}
                    ml={2.5}
                  />
                }
                value={search}
                rounded='full'
                onChangeText={(text) => setSearch(text)}
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                }}
                placeholder='Search menu'
                variant='filled'
              />
            </FormControl>
          )}

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
          {isSuccess && (
            <FlatList
              data={menus}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.group_name}
              horizontal={true}
              alwaysBounceHorizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
          {/* <ScrollView
            rounded='full'
            width={'100%'}
            className='h-fit '
            horizontal={true}
            alwaysBounceHorizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <HStack className='py-8 bg-gray-200' rounded='full' space={3}>
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
            </HStack>
          </ScrollView> */}
        </VStack>
        <Box className='flex-1 sm:px-4'>
          {isLoading && <LoadingSpinner message='Loading menu' />}
          {isSuccess && (
            <MenuListView query={search} menus={filterMenu ?? menus[0].menus} />
          )}
        </Box>
      </View>
      {/* )} */}
    </>
  )
}

export default SelectOrder
