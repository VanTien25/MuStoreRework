import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import database from '@react-native-firebase/database';
import ItemCart from '../Component/ItemCart';

const Category = ({ navigation }) => {
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    database()
      .ref('Category/')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            image: item.image,
            title: item.name,
          });
        })
        setListCategory(arr);
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
        <Text style={{ fontSize: 18, color: 'yellow', fontWeight: 'bold' }}>Quản lý loại sản phẩm</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddCategory');
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
        data={listCategory}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <ItemCart
              item={item}
              onDelete={x => {
                database().ref('Product/' + x).remove();
              }}
              onUpdate={x => {
                Alert.alert('Thông báo', 'Chọn mục bạn muốn thay đổi.', [
                  {
                    text: 'Thông tin',
                    onPress: () => navigation.navigate('UpdateCategory', {
                      id: x.id,
                      image: x.image,
                      title: x.title,
                    }),
                  },
                ],
                  {
                    cancelable: true,
                  },
                );
              }}
            />
          )
        }} />
    </View>
  )
}

export default Category