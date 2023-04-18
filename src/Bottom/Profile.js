import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';


const Profile = () => {
  const navigation = useNavigation();
  const email = firebase.auth().currentUser.email;

  const logOut = () => {
    auth()
      .signOut()
      .then(() =>
        Alert.alert('Đăng xuất thành công'),
        navigation.navigate('Signin')
      );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 70,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#AA0000'
        }}>
        <Text style={{ fontWeight: '600', fontSize: 22, marginLeft: 15, color: 'yellow' }}>
          Profile
        </Text>
      </View>
      {/* <View style={{ position: 'absolute', top: 20, right: 15, flexDirection: 'row' }}>
        {
          email == "admin@gmail.com" ?
            (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Admin');
                }}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Images/manager.png')}
                  style={{ width: 30, height: 30, tintColor: 'yellow' }}
                />
              </TouchableOpacity>
            ) : null
        }



      </View> */}
      <Image
        source={require('../Images/profile.png')}
        style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 30 }}
      />
      <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 18, color: 'black' }}>
        {email}
      </Text>
      <TouchableOpacity
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 50,
          borderBottomWidth: 0.3,
          marginTop: 20,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('MyAddress');
        }}>
        <Text style={{ color: 'black' }}>Thông tin địa chỉ của tôi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 50,
          borderBottomWidth: 0.3,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('MyOrder');
        }}>
        <Text style={{ color: 'black' }}>Đơn hàng của tôi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 50,
          borderBottomWidth: 0.3,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('MyVoucher');
        }}>
        <Text style={{ color: 'black' }}>Kho Voucher</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          logOut();
        }}
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 50,
          borderBottomWidth: 0.3,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
        <Text style={{ color: 'black' }}>Đăng xuất</Text>
        <Image
          source={require('../Images/logout.png')}
          style={{ width: 30, height: 30, tintColor: 'black' }}
        />
      </TouchableOpacity>

    </View>
  )
}

export default Profile