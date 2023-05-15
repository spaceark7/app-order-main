import { FlatList } from 'native-base'
import { useCallback, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'

import MenuView from './MenuView'

const MenuListView = ({ menus }) => {
  const { width } = useWindowDimensions()
  const numColumns = useMemo(() => {
    if (width >= 768) {
      return 2
    } else {
      return 1
    }
  }, [width])
  const itemWidth = width / numColumns - 32
  const render = useCallback(
    ({ item }) => <MenuView key={item.id} menu={item} itemWidth={itemWidth} />,
    [itemWidth]
  )

  return (
    <FlatList
      numColumns={numColumns}
      data={menus}
      renderItem={render}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={1000}
      keyExtractor={(menus) => menus.id.toString()}
    />
  )
}

export default MenuListView
