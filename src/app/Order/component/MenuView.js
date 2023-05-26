// import { FormControl, HStack, Input, VStack } from 'native-base'
import { memo, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  addMenu,
  incrementMenuQty,
  incrementMenuQtyByAmount,
  removeMenu,
  selectMenuById,
} from '../PickOrderSlice'
import { formatCurrency } from 'react-native-format-currency'
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { useCallback } from 'react'

const MenuView = ({ itemWidth, menu, onSelect, selected }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  // evaluate to boolean if menu is added
  const isMenuAdded = useSelector((state) => selectMenuById(state, menu.id))

  const [valueFormattedWithSymbol] = formatCurrency({
    amount: Number(menu.amount),
    code: 'IDR',
  })

  const addQty = useCallback(() => {
    setQty((prev) => prev + 1)
    dispatch(incrementMenuQty(menu.id))
    onSelect(menu.id)
  }, [dispatch, menu.id, onSelect, qty])

  const subQty = useCallback(() => {
    if (qty <= 1) dispatch(removeMenu(menu.id))
    else {
      setQty((prev) => prev - 1)
    }
    onSelect(menu.id)
  }, [dispatch, menu.id, onSelect, qty])

  const handleAddMenu = useCallback(() => {
    onSelect(menu.id)
    dispatch(addMenu({ ...menu, qty: qty }))
  }, [dispatch, menu.id, qty, isMenuAdded])

  // const addQty = () => {
  //   setQty((prev) => prev + 1)
  //   dispatch(incrementMenuQty(menu.id))
  //   onSelect(menu.id)
  // }

  // const subQty = () => {
  //   if (qty <= 1) dispatch(removeMenu(menu.id))
  //   else {
  //     setQty((prev) => prev - 1)
  //   }
  //   onSelect(menu.id)
  // }

  // const handleAddMenu = () => {
  //   onSelect(menu.id)
  //   dispatch(addMenu({ ...menu, qty: qty }))
  // }

  let controlComponent

  if (isMenuAdded && isMenuAdded.id === menu.id) {
    controlComponent = (
      <View className='flex-0 flex-row space-x-1 items-center'>
        {/* <TouchableWithoutFeedback
          onPress={subQty}
          className='bg-gray-200 rounded-full w-8 h-8 items-center justify-center'
        >
          <Text className='font-bold text-lg'>-</Text>
        </TouchableWithoutFeedback> */}

        <TextInput
          value={qty.toString()}
          selectTextOnFocus={true}
          onChangeText={(value) => {
            if (!value) {
              setQty(1)
            } else {
              setQty(parseInt(value))
              dispatch(
                incrementMenuQtyByAmount({ id: menu.id, qty: parseInt(value) })
              )
            }
          }}
          keyboardType='number-pad'
          inputMode='numeric'
          className='w-12 text-center font-bold'
        />
        {/* 
        <TouchableWithoutFeedback
          onPress={addQty}
          className='bg-gray-200 rounded-full w-8 h-8 items-center justify-center'
        >
          <Text className='font-bold text-lg'>+</Text>
        </TouchableWithoutFeedback> */}
      </View>
    )
  } else {
    controlComponent = (
      <TouchableOpacity
        onPress={handleAddMenu}
        className='bg-none border px-4 py-1 border-red-700 rounded-full'
      >
        <Text className='text-base text-red-600'>Add</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        width: itemWidth,
      }}
      className='rounded-lg flex-row py-4 px-4 sm:px-2  items-center  border border-t-0 border-x-0 border-b-gray-200 shadow-md'
    >
      <View space={1} className=' flex-1'>
        <Text className='sm:text-lg font-bold'>{menu.menu_name}</Text>
        <Text className='font-bold text-xs sm:text-base'>
          {valueFormattedWithSymbol}
        </Text>
      </View>
      {controlComponent}
    </View>
  )
}

export default memo(MenuView)
