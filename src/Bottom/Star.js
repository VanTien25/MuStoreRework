import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const Star = () => {
  const [listVoucher, setListVoucher] = useState([]);
  const [myStar, setMyStar] = useState(0);
  const [myVoucher, setMyVoucher] = useState([]);
  const userID = firebase.auth().currentUser.uid;

  useEffect(() => {
    database()
      .ref('User/' + userID)
      .update({
        myStar: myStar,
      })
      .then();
  }, [myStar]);

  useEffect(() => {
    database().ref('Voucher/').on('value', snapshot => {
      let arr = [];
      snapshot.forEach(child => {
        var item = child.val();
        arr.push({
          id: child.key,
          title: item.title,
          coin: item.coin,
          value: item.value,
          price: item.price,
        });
      })
      setListVoucher(arr);
    });
  }, []);

  useEffect(() => {
    database().ref('Myvoucher/' + userID).on('value', snapshot => {
      let arr = [];
      snapshot.forEach(child => {
        var item = child.val();
        arr.push({
          id: child.key,
          quantity: item.quantity,
        })
      })
      setMyVoucher(arr);
    });
  }, [])

  useEffect(() => {
    database().ref('User/' + userID).on('value', snapshot => {
      var star = snapshot.val();
      setMyStar(star.myStar);
    });
  }, []);

  const onAddMyvoucher = (item) => {
    setMyStar(myStar - item.coin);
    database().ref('Myvoucher/' + userID).push().set({
      idVoucher: item.id,
      title: item.title,
      coin: item.coin,
      value: item.value,
      price: item.price,
    }).then(() => {
      alert('Đổi thành công');
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Header */}
      <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#AA0000' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Star Shop</Text>
        <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>{myStar}
          <Image source={require('../Images/starpoint.png')} style={{ width: 24, height: 24 }} />
        </Text>
      </View>

      {/* Voucher */}
      <View style={{ alignItems: 'center', paddingTop: 10 }}>
        <FlatList
          data={listVoucher}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (myStar >= item.coin) {
                    onAddMyvoucher(item)
                  } else {
                    alert('Bạn không đủ điểm!')
                  }
                }}
                style={{
                  width: '98%',
                  height: 100,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  backgroundColor: '#FFFF66',
                  borderRadius: 10,
                  marginBottom: 10,
                  padding: 10,
                  alignSelf: 'center',
                }}>
                <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../Images/giftbox.png')}
                    style={{ width: 50, height: 50 }} />
                  <Text style={{ color: 'green', fontSize: 25, fontWeight: 'bold' }}>{item.coin}</Text>
                </View>
                <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                  <Text style={{ color: 'red', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    </View>
  )
}

export default Star