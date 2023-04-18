import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Product from '../Drawer/Product'
import Order from '../Drawer/Order'
import Voucher from '../Drawer/Voucher'
import Category from '../Drawer/Category'
import Slider from '../Drawer/Slider'

const Drawer = createDrawerNavigator();


const Ad = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerShown: false,
      }}>
      <Drawer.Screen
        name="Quản lý sản phẩm"
        component={Product} />

      <Drawer.Screen
        name="Quản lý đơn hàng"
        component={Order} />

      <Drawer.Screen
        name="Quản lý voucher"
        component={Voucher} />

      <Drawer.Screen
        name="Quản lý loại sản phẩm"
        component={Category} />

      <Drawer.Screen
        name="Quản lý banner quảng cáo"
        component={Slider} />

    </Drawer.Navigator>
  )
}

export default Ad