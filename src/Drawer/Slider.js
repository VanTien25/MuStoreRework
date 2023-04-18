import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';

const Slider = ({ navigation }) => {
  const [listSlider, setListSlider] = useState([]);

  useEffect(() => {
    database()
      .ref('Slider/')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            image: item.image,
          })
        })
        setListSlider(arr);
      });
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        width: '100%',
        height: 60,
        backgroundColor: '#AA0000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={require('../Images/back.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: 'yellow',
            }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: 'yellow', fontWeight: 'bold' }}>Quản lý banner quảng cáo</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddSlider');
          }}
        >
          <Image
            source={require('../Images/additem.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: 'yellow'
            }} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={listSlider}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <View style={{
              width: '100%',
              alignSelf: 'center',
              borderBottomWidth: 10,
              borderBottomColor: '#DDDDDD',
              backgroundColor: '#fff',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginLeft: 15 }}
              >Mã hình ảnh:   {item.id.length > 20 ? item.id.substring(0, 20) + '...' : item.id}</Text>
              <Image src={item.image}
                style={{
                  width: '90%',
                  height: 200,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  borderRadius: 10,
                }} />
            </View>
          )
        }} />
    </View>
  )
}

export default Slider