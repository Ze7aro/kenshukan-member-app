import React from 'react'
import { View } from 'react-native'
import DataList from './DataList';
import AppBar from './AppBar';
import Login from './pages/Login';

const Main = () => {
  return (
    <View style={{flex: 1, flexGrow: 3}}>
      <AppBar />
       {/* <Login /> */}
         <DataList />
    </View>
  )
}

export default Main