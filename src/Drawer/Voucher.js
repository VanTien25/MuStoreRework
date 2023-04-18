import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';

const Voucher = ({ navigation }) => {
  const [listVoucher, setListVoucher] = useState([]);

  useEffect(() => {
    database()
      .ref('Voucher/')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            title: item.title,
            coin: item.coin,
            price: item.price,
            value: item.value,
          });
        })
        setListVoucher(arr);
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
        <Text style={{ fontSize: 18, color: 'yellow', fontWeight: 'bold' }}>Quản lý voucher</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddVoucher');
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
        data={listVoucher}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <View style={{
              width: '100%',
              height: 180,
              padding: 25,
              borderBottomWidth: 5,
              borderBottomColor: '#CCCCCC',
            }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mã sản phẩm:   {item.id.length > 20 ? item.id.substring(0, 20) + '...' : item.id}</Text>
              <Text style={{ fontSize: 20 }}>Tiêu đề:   {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Giá:   {item.coin}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF9900' }}>Giá khuyến mãi:   {item.price} VNĐ</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Giá trị voucher:   {item.value} VNĐ</Text>
            </View>
          )
        }} />

    </View>
  )
}

export default Voucher