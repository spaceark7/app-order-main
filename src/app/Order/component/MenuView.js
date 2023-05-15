import { Button, FormControl, HStack, Input, VStack } from 'native-base'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  addMenu,
  incrementMenuQty,
  removeMenu,
  selectMenuById,
} from '../PickOrderSlice'

const MenuView = ({ itemWidth, menu }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const isMenuAdded = useSelector((state) => selectMenuById(state, menu.id))

  const addQty = () => {
    setQty((prev) => prev + 1)
    dispatch(incrementMenuQty(menu.id))
  }

  const subQty = () => {
    if (qty <= 1) dispatch(removeMenu(menu.id))
    else {
      setQty((prev) => prev - 1)
      dispatch(incrementMenuQty(menu.id))
    }
  }
  return (
    <HStack
      style={{
        width: itemWidth - 20,
      }}
      className='rounded-lg py-4 px-2 m-2 border border-t-0 border-x-0 border-b-gray-200 shadow-md'
    >
      <VStack space={1} className='flex-1 w-full'>
        <Text className='text-lg font-bold'>{menu.menu_name}</Text>
        <Text className=' font-bold'>Rp.{menu.amount}</Text>
      </VStack>
      {isMenuAdded ? (
        <View className='flex-row space-x-1 items-center'>
          <Button
            w='12'
            className='rounded-full'
            onPress={subQty}
            variant='subtle'
            colorScheme={'gray'}
          >
            <Text className='font-bold text-lg'>-</Text>
          </Button>
          <FormControl width={'12'}>
            <Input
              width={'12'}
              className='w-fit'
              textAlign={'center'}
              returnKeyLabel='done'
              returnKeyType='done'
              value={qty.toString()}
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
                if (!value) setQty(1)
                else {
                  setQty(parseInt(value))
                }
              }}
              keyboardType='number-pad'
              variant='unstyled'
              inputMode='numeric'
            />
          </FormControl>
          <Button
            className='rounded-full'
            w='12'
            onPress={addQty}
            variant='subtle'
            colorScheme={'gray'}
          >
            <Text className='font-bold text-lg'>+</Text>
          </Button>
        </View>
      ) : (
        <Button
          w={'1/4'}
          className='rounded-full'
          variant={'outline'}
          colorScheme={'primary'}
          borderColor={'primary.500'}
          onPress={() => dispatch(addMenu({ ...menu, qty: qty }))}
        >
          Add
        </Button>
      )}

      {/* <View className='flex-row space-x-1 items-center'>
        <Button
          w='12'
          className='rounded-full'
          onPress={() => {
            //   setGuest_no((prev) => (prev > 1 ? prev - 1 : 1))
          }}
          variant='subtle'
          colorScheme={'gray'}
        >
          <Text className='font-bold text-lg'>-</Text>
        </Button>
        <FormControl width={'12'}>
          <Input
            width={'12'}
            className='w-fit'
            textAlign={'center'}
            returnKeyLabel='done'
            returnKeyType='done'
            value={'1'}
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
            // onChangeText={(value) => {
            //   if (!value) setGuest_no(1)
            //   else {
            //     setGuest_no(parseInt(value))
            //   }
            // }}
            keyboardType='number-pad'
            variant='unstyled'
            inputMode='numeric'
          />
        </FormControl>
        <Button
          className='rounded-full'
          w='12'
          onPress={() => {
            dispatch(addMenu(menu))
          }}
          variant='subtle'
          colorScheme={'gray'}
        >
          <Text className='font-bold text-lg'>+</Text>
        </Button>
      </View> */}
    </HStack>
  )
}

export default MenuView
