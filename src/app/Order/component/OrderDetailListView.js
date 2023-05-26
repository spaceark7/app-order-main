import { FlatList } from 'native-base'
import { useCallback, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'

import OrderMenuView from './OrderMenuView'

const OrderDetailListView = ({ menus, isConfirm }) => {
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
    ({ item }) => (
      <OrderMenuView menu={item} itemWidth={itemWidth} isConfirm={isConfirm} />
    ),
    [itemWidth]
  )

  return isConfirm ? (
    <FlatList
      numColumns={numColumns}
      data={menus}
      renderItem={render}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={1000}
      keyExtractor={(menus) => menus.id.toString()}
    />
  ) : (
    <FlatList
      numColumns={numColumns}
      data={menus}
      renderItem={render}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={1000}
      keyExtractor={(menus) => menus.menu_id.toString()}
    />
  )
}

//default props here
OrderDetailListView.defaultProps = {
  isConfirm: false,
}

export default OrderDetailListView
