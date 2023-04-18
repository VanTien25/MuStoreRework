import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';
import ItemCart from '../Component/ItemCart';

const Product = ({ navigation }) => {
  const [listProduct, setListProduct] = useState([]);


  useEffect(() => {
    database()
      .ref('Product/')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            idCat: item.idCategory,
            category: item.category,
            desc: item.desc,
            image: item.image,
            price: item.price,
            size: item.size,
            star: item.star,
            title: item.title,
          })
        })
        setListProduct(arr);
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
        <Text style={{ fontSize: 18, color: 'yellow', fontWeight: 'bold' }}>Quản lý sản phẩm</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddProduct');
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
        data={listProduct}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <ItemCart
              item={item}
              onDetailProduct={x => {
                navigation.navigate('DetailAD', {
                  id: x.id,
                  category: x.category,
                  desc: x.desc,
                  image: x.image,
                  price: x.price,
                  size: x.size,
                  star: x.star,
                  title: x.title,

                })
              }}
              onDelete={x => {
                database().ref('Product/' + x).remove();
              }}
              onUpdate={x => {
                Alert.alert('Thông báo', 'Chọn mục bạn muốn thay đổi.', [
                  {
                    text: 'Mã',
                    onPress: () => navigation.navigate('UpdateIDProduct', {
                      id: x.id,
                      idCat: x.idCat,
                      category: x.category
                    }),
                  },
                  {
                    text: 'Thông tin',
                    onPress: () => navigation.navigate('UpdateProduct', {
                      id: x.id,
                      desc: x.desc,
                      image: x.image,
                      price: x.price,
                      star: x.star,
                      title: x.title,
                    }),
                  },
                  {
                    text: 'Số lượng',
                    onPress: () => navigation.navigate('UpdateSize', {
                      id: x.id,
                      size: x.size,
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

export default Product