import React from 'react'
import { FlatList, View } from 'react-native'
import useDataHook from '../hooks/useDataHook'
import ProfileCard from './ProfileCard'

const DataList = () => {
  const {data} = useDataHook();

  return (
    <FlatList
    data={data}
    renderItem={({item}) => (
      <ProfileCard {...item}/>
    )}
    ListFooterComponent={<View style={{ height: 50 }} />}
    />
  )
}

export default DataList
