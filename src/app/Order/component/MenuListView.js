import { FlatList } from 'native-base'
import { useCallback, useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'

import MenuView from './MenuView'
import NotFound from 'components/NotFound'
import { useSelector } from 'react-redux'
import { selectAllMenu } from '../PickOrderSlice'

const MenuListView = ({ menus, query }) => {
  const [selectedMenu, setSelectedMenu] = useState(null)

  const { width } = useWindowDimensions()
  const numColumns = useMemo(() => {
    if (width >= 768) {
      return 2
    } else {
      return 1
    }
  }, [width])

  const orderMenus = useSelector(selectAllMenu)

  const itemWidth = useMemo(() => width / numColumns, [width, numColumns])
  const render = useCallback(
    ({ item }) => (
      <MenuView
        menu={item}
        selected={selectedMenu}
        onSelect={setSelectedMenu}
        itemWidth={itemWidth}
      />
    ),
    [itemWidth, selectedMenu, orderMenus]
  )
  const keyExtractor = (item, index) => index.toString()
  const ITEM_HEIGHT = 65 // fixed height of item component
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }
  }
  return (
    <FlatList
      numColumns={numColumns}
      data={menus}
      renderItem={render}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      getItemLayout={getItemLayout}
      ListEmptyComponent={<NotFound message={query} />}
      keyExtractor={keyExtractor}
      extraData={selectedMenu}
    />
  )
}

export default MenuListView
