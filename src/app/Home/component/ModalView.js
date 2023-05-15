import { View, Text, Platform } from 'react-native'
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import {
  clearTable,
  selectModal,
  selectTable,
  setOpenModal,
} from '../ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  KeyboardAvoidingView,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { setActiveOrder, setOrderInfo } from 'app/Order/PickOrderSlice'

const ModalView = () => {
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], [])
  const modal = useSelector(selectModal)
  const tableDetail = useSelector(selectTable)
  const [guest_no, setGuest_no] = useState(1)
  const [guest_name, setGuest_name] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { user } = useSelector((state) => state.auth)

  useLayoutEffect(() => {
    if (modal) bottomSheetRef.current?.present()

    return () => {
      bottomSheetRef.current?.dismiss()
    }
  }, [modal])
  const handleSheetChanges = useCallback((index) => {}, [modal, dispatch])

  const handleCloseModal = useCallback(() => {
    bottomSheetRef.current?.dismiss()
    dispatch(setOpenModal(false))
    dispatch(clearTable())
    setGuest_no(0)
  }, [dispatch])

  const handleSubmit = () => {
    const date = new Date()
    const YYYYMMDD = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate()}`
    dispatch(setOpenModal(false))
    dispatch(clearTable())
    setGuest_name('')
    setGuest_no(1)
    dispatch(setActiveOrder(true))
    dispatch(
      setOrderInfo({
        sales_date: YYYYMMDD,
        table_id: tableDetail.table_id,
        guest_name: guest_name,
        guest_no: guest_no,
        device_name: user.device_name,
      })
    )
    navigation.navigate('select-order', {
      tableId: tableDetail.table_id,
      tableName: tableDetail.table_name,
      guestNo: guest_no,
      guest_name: guest_name,
    })
    bottomSheetRef.current?.dismiss()
  }

  const backDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  )

  return (
    <View>
      <BottomSheetModal
        stackBehavior='push'
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onDismiss={() => {
          dispatch(setOpenModal(false))
          dispatch(clearTable())
        }}
        backdropComponent={backDrop}
      >
        <View className='p-2 flex-1'>
          <HStack>
            <Text className='flex-1 text-center font-bold'>
              Guest Info for{' '}
              <Text className='text-red-800'>{tableDetail?.table_name}</Text>
            </Text>
            <IconButton
              _icon={{
                as: MaterialCommunityIcons,
                name: 'close',
              }}
              onPress={handleCloseModal}
            />
          </HStack>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
          >
            <View className='py-4 px-2 '>
              <FormControl>
                <Input
                  returnKeyLabel='next'
                  returnKeyType='next'
                  value={guest_name}
                  onChangeText={(value) => {
                    setGuest_name(value)
                  }}
                  placeholder='Guest Name'
                  variant='filled'
                  type='text'
                />
              </FormControl>

              <View className='flex-row items-center justify-between gap-x-2 my-8'>
                <Text className='font-bold '>No. of Guests :</Text>
                <FormControl width={'20'}>
                  <Input
                    width={'20'}
                    className='w-fit'
                    textAlign={'center'}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    value={guest_no.toString()}
                    size={'xl'}
                    selectTextOnFocus={true}
                    _focus={{
                      _android: {
                        selectionColor: 'primary.300',
                      },
                      _ios: {
                        selectionColor: 'primary.300',
                      },
                    }}
                    fontWeight={'bold'}
                    editable={false}
                    onChangeText={(value) => {
                      if (!value) setGuest_no(1)
                      else {
                        setGuest_no(parseInt(value))
                      }
                    }}
                    keyboardType='number-pad'
                    variant='underlined'
                    inputMode='numeric'
                  />
                </FormControl>
                <Button.Group variant='solid' className='justify-center'>
                  <Button
                    w='16'
                    onPress={() => {
                      setGuest_no((prev) => (prev > 1 ? prev - 1 : 1))
                    }}
                    variant='subtle'
                    colorScheme={'gray'}
                  >
                    <Text className='font-bold text-lg'>-</Text>
                  </Button>
                  <Button
                    w='16'
                    onPress={() => {
                      setGuest_no((prev) => prev + 1)
                    }}
                    variant='subtle'
                    colorScheme={'gray'}
                  >
                    <Text className='font-bold text-lg'>+</Text>
                  </Button>
                </Button.Group>
              </View>
              <Button
                onPress={handleSubmit}
                variant='solid'
                colorScheme={'primary'}
              >
                <Text className='font-bold text-lg text-white'>Next</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </BottomSheetModal>
    </View>
  )
}

export default ModalView
