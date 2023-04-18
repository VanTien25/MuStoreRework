import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground, Modal, Pressable } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import AddToCart from '../Component/AddToCart';
import { CheckoutContext } from '../Context/CheckoutContext';

const Cart = ({ navigation }) => {
  const {checkout, setCheckout} = useContext(CheckoutContext);
  const [dataCart, setDataCart] = useState([]);
  const userID = firebase.auth().currentUser.uid;
  const total = dataCart.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0);
  const totalStar = dataCart.reduce((accumulator, current) => accumulator + current.star * current.quantity, 0)

  useEffect(() => {
    database()
      .ref('Cart/' + userID)
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            idProduct: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            star: item.star,
            desc: item.desc,
            size: item.size,
            quantity: item.quantity,
          })
        })
        setDataCart(arr);
      });
  }, [])

  const handleSubmit = () => {
    setCheckout({
      dataCart,
      total,
      totalStar,
    })
    navigation.navigate('Checkout')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{
        width: '90%', height: 45, flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
        backgroundColor: '#AA0000', borderBottomLeftRadius: 50,
        borderBottomEndRadius: 50
      }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Giỏ hàng của tôi</Text>
      </View>

      {dataCart.length > 0 ? (
        <FlatList
          data={dataCart}
          renderItem={({ item, index }) => {
            return (
              <AddToCart item={item} />
            )
          }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Không có sản phẩm nào trong giỏ hàng</Text>
        </View>
      )}
      {dataCart.length > 0 ? (
        <View style={{ backgroundColor: '#FFFFCC' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 7 }}>
            <Text style={{ fontSize: 20, }}>Tổng tiền:</Text>
            <Text style={{ fontSize: 20, }}>{total} VNĐ</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 7 }}>
            <Text style={{ fontSize: 20, }}>Điểm tích lũy:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, marginRight: 5 }}>{totalStar}</Text>
              <Image
                source={require('../Images/star.png')}
                style={{ width: 25, height: 25 }} />
            </View>

          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
              height: 50,
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 5
            }}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      ) : null
      }
    </View >
  )
}

export default Cart