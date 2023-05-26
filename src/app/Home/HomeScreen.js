import { MaterialIcons } from '@expo/vector-icons'
import { useLogoutMutation } from 'api/loginApi'
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
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import TableListView from './component/TableListView'
import { useGetSectionQuery } from 'api/sectionApi'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectModal, setOpenModal } from './ModalSlice'
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import ModalView from './component/ModalView'

const HomeScreen = ({ navigation }) => {
  const [logout] = useLogoutMutation()
  const modal = useSelector(selectModal)

  const {
    data: sections,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useGetSectionQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 10000,
  })

  const [selectedSection, setSelectedSection] = useState('')

  const [selectedTable, setSelectedTable] = useState(
    sections?.[0]?.tables ?? null
  )

  const handleLogout = async () => {
    await logout()
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section)
    setSelectedTable(section)
  }

  const menu = useSelector((state) => state.order.menus)

  useEffect(() => {
    if (isSuccess) setSelectedSection(sections[0])
  }, [isSuccess])

  // ref
  const bottomSheetRef = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['50%', '100%'], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])
  return (
    <Box
      _important={{
        backgroundColor: 'white',
      }}
      className='flex-1 w-full  relative'
    >
      <VStack className='px-4 py-4' space={3}>
        {/* <FormControl>
          <Input
            returnKeyLabel='done'
            returnKeyType='done'
            InputLeftElement={
              <Icon as={<MaterialIcons name='search' />} size={5} ml={2.5} />
            }
            rounded='full'
            onSubmitEditing={() => {}}
            placeholder='Search by table number/name'
            variant='filled'
          />
        </FormControl> */}

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
                sections.map((section, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedSection.section_name === section.section_name
                        ? 'solid'
                        : 'ghost'
                    }
                    colorScheme='primary'
                    rounded='full'
                    onPress={() => handleSectionChange(section)}
                  >
                    {`${section.section_name}`}
                  </Button>
                ))}
            </Button.Group>
          </HStack>
        </ScrollView>
      </VStack>
      <Box className='flex-1 h-full px-4'>
        {isLoading && (
          <View className='flex-row items-center flex-wrap justify-around gap-x-3 gap-y-4 w-full py-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton rounded='md' width={'40%'} height={'30%'} key={index} />
            ))}
          </View>
        )}
        {isSuccess && <TableListView section={selectedSection ?? sections} />}
      </Box>

      <BottomSheetModalProvider>
        <ModalView />
      </BottomSheetModalProvider>

      {/* <Button title='Go to Login' onPress={handleLogout}>
        Go to Login
      </Button> */}
    </Box>
  )
}

export default HomeScreen
