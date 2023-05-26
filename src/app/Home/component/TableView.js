import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'native-base'
import { memo } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { setOpenModal, setTable } from '../ModalSlice'

const tableImage = require('../../../assets/table.png')

const TableView = ({ table, itemWidth }) => {
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const handlePress = () => {
    if (table.status !== 'Free') {
      navigation.navigate('order', {
        tableId: table.id,
        tableName: table.table_name,
      })
    } else if (table.status === 'used') {
      alert('Table is opened by another user')
    } else {
      dispatch(setOpenModal(true))
      dispatch(
        setTable({
          table_id: table.id,
          table_name: table.table_name,
        })
      )
    }
  }
  return (
    <TouchableOpacity
      key={table.id}
      onPress={handlePress}
      className='rounded-lg  p-4 m-2'
      style={{
        width: itemWidth,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 4,
        padding: 16,
      }}
    >
      <View className='h-fit'>
        <ImageBackground
          resizeMode='contain'
          className='flex-1 justify-center items-center max-h-52'
          source={tableImage}
        >
          <View className='h-36 w-full items-center justify-center p-4'>
            <View
              className={`${
                table.status !== 'Free' && 'bg-yellow-500'
              }  w-full h-full rounded-xl p-2 justify-between`}
            >
              <Text
                className={`${
                  table.status && 'text-red-800'
                } text-right  text-lg font-bold`}
              >
                {table.table_name}
              </Text>
              <View
                className='w-full justify-center flex-row space-x-1'
                alignItems='center'
              >
                {table.status !== 'Free' ? (
                  <>
                    <Icon
                      size={'sm'}
                      as={Ionicons}
                      className='text-red-800 '
                      name='people'
                    />
                    <Text className='text-xs font-semibold'>
                      {table.person} Person
                    </Text>
                  </>
                ) : (
                  <Text className='text-xs font-semibold text-gray-300'>
                    Empty
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default memo(TableView)
