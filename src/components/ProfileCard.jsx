import React from 'react'
import { Text, View, Image } from 'react-native'

const ProfileCard = (props) => {
  return (
    <View key={props._id}  style={{marginVertical: 5, padding: 10}} >
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image source={{ uri: props.image }} style={{width: 48, height: 48, borderRadius: 4}} />
            <View>
                <Text>NOMBRE: {props.name}</Text>
                <Text>CATEGORIA: {props.category}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text>ESTADO: {props.status ? 'ACTIVO' : 'INACTIVO'}</Text>
            </View>
        </View>
</View>
  )
}

export default ProfileCard