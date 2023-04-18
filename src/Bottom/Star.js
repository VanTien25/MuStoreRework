import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';
import { useEffect } from 'react';
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
            value: item.value,
            price: item.price,
          });
        })
        setListVoucher(arr);
        console.log(arr);
      });
  }, []);

  useEffect(() => {
    database()
      .ref('Myvoucher/' + userID)
      .on('value', snapshot => {
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
    database()
      .ref('User/' + userID)
      .on('value', snapshot => {
        var star = snapshot.val();
        setMyStar(star.myStar);
      });
  }, []);

  const onUpdateMyvoucher = (x, y) => {
    console.log(x)
    setMyStar(myStar - y.coin);
    x.quantity += 1
    database()
      .ref('Myvoucher/' + userID + '/' + x.id)
      .update({
        quantity: x.quantity,
      })
      .then(() => alert('Đổi thành công'));
  }

  const onAddMyvoucher = (item) => {
    if (myStar - item.coin >= 0) {
      setMyStar(myStar - item.coin);
    }

    database().ref('Myvoucher/' + userID + '/' + item.id).set({
      title: item.title,
      coin: item.coin,
      value: item.value,
      price: item.price,
      quantity: 1,
    })
      .then(() => {
        alert('Đổi thành công');
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#CCCCCC' }}>

      {/* Header */}
      <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#AA0000' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Star Shop</Text>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            fontWeight: '500',
            padding: 5,
          }}
        >
          {myStar}
          <Image
            source={require('../Images/starpoint.png')}
            style={{
              width: 24,
              height: 24,
            }} />
        </Text>
      </View>

      {/* Voucher */}
      <FlatList
        data={listVoucher}
        renderItem={({ item, index }) => {
          if (myStar >= item.coin) {
            return (
              <TouchableOpacity
                onPress={() => {
                  const Obj = myVoucher.find(element => {
                    if (element.id === item.id) {
                      return true;
                    }

                    return false;
                  });


                  if (Obj !== undefined) {
                    onUpdateMyvoucher(Obj, item)
                  } else {
                    onAddMyvoucher(item);
                  }
                }}
                style={{ flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View
                  style={{
                    width: '99%',
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#FFFF99',
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <View style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Image
                      source={require('../Images/giftbox.png')}
                      style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} />
                    <Text
                      style={{
                        color: 'green',
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: 'bold'
                      }}>
                      {item.coin}
                    </Text>
                  </View>

                  <View style={{
                    width: '70%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text
                      style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}>
                      {item.title}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <View style={{ flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View
                  style={{
                    width: '99%',
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#DDDDDD',
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <View style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Image
                      source={require('../Images/giftbox.png')}
                      style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} />
                    <Text
                      style={{
                        color: 'green',
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: 'bold'
                      }}>
                      {item.coin}
                    </Text>
                  </View>

                  <View style={{
                    width: '70%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text
                      style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}>
                      {item.title}
                    </Text>
                  </View>

                </View>
              </View>
            );
          }

        }} />
    </View>
  )
}

export default Star