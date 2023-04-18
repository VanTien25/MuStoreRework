import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { Swipeable } from 'react-native-gesture-handler';
import { CheckoutContext } from '../Context/CheckoutContext';
import Header from '../Component/Header';

const MyAddress = ({ navigation }) => {
  const [listAddress, setListAddress] = useState([])
  const userID = firebase.auth().currentUser.uid;
  const { address, setAddress } = useContext(CheckoutContext);

  const rightSwipe = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 4,
          borderBottomColor: '#DDDDDD'
        }}>
        <Image
          source={require('../Images/recyclebin.png')}
          style={{
            width: 40,
            height: 40,
            tintColor: '#fff',
          }} />
      </View>
    )
  };

  const onComponentOpen = (id) => {
    database().ref('Address/' + userID + '/' + id).remove();
    Alert.alert('Xóa thành công.')
  }

  useEffect(() => {
    database()
      .ref('Address/' + userID)
      .on('value', snapshot => {
        let array = []
        snapshot.forEach(childSnapshot => {
          var item = childSnapshot.val();
          array.push({
            idAdd: childSnapshot.key,
            name: item.name,
            phone: item.phone,
            home: item.home,
            city: item.city,
          })
        })
        setListAddress(array);
      });
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#DDDDDD' }}>
        <Header navigation={navigation} text={'Địa chỉ'} />

        <FlatList
          data={listAddress}
          keyExtractor={item => item.idAdd}
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                renderRightActions={rightSwipe}
                onSwipeableOpen={() => {
                  onComponentOpen(item.idAdd);
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setAddress(item)
                    navigation.goBack();
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    borderBottomWidth: 4,
                    borderBottomColor: '#DDDDDD'
                  }}>
                  <View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{item.name}</Text>
                      <Text style={{ fontSize: 18 }}> | </Text>
                      <Text style={{ fontSize: 18 }}>{item.phone}</Text>
                    </View>
                    <Text style={{ color: 'black', marginBottom: 5 }}>{item.home}, {item.city}</Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />

        <TouchableOpacity
          style={{
            width: '100%',
            marginRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 7,
            flexDirection: 'row',
            borderTopWidth: 0.2,
            backgroundColor: '#fff',
          }}
          onPress={() => {
            navigation.navigate('AddAddress');
          }}>
          <Image
            source={require('../Images/add.png')}
            style={{ width: 25, height: 25, marginRight: 5, tintColor: 'red' }} />
          <Text style={{ color: 'red', fontSize: 16 }}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MyAddress