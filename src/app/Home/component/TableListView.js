import { FlatList } from 'native-base'
import { useCallback, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'

import TableView from './TableView'
import { useGetSectionQuery } from 'api/sectionApi'

const TableListView = ({ section }) => {
  const { data } = useGetSectionQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const selectedTable = useMemo(() => {
    if (section.section_name) {
      const selectedSection = data.find(
        (item) => item.section_name === section.section_name
      )
      return selectedSection.tables
    } else {
      return data[0]?.tables ?? null
    }
  }, [data, section.section_name])

  const { width } = useWindowDimensions()
  const numColumns = useMemo(() => {
    if (width >= 768) {
      return 4
    } else if (width >= 576) {
      return 3
    } else {
      return 2
    }
  }, [width])
  const itemWidth = width / numColumns - 32
  const render = useCallback(
    ({ item }) => <TableView table={item} itemWidth={itemWidth} />,
    [itemWidth]
  )

  return (
    <FlatList
      numColumns={numColumns}
      data={selectedTable}
      renderItem={render}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={100}
      keyExtractor={(selectedTable) => selectedTable.id.toString()}
      extraData={selectedTable}
    />
  )
}

export default TableListView
