import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './User/Splash'
import Signin from './User/Signin'
import Signup from './User/Signup'
import Main from './User/Main';
import Ad from './Admin/Ad';
import AddProductStep1 from './Admin/AddProductStep1';
import AddCategory from './Admin/AddCategory';
import AddVoucher from './Admin/AddVoucher';
import AddSlider from './Admin/AddSlider';
import AddProductStep2 from './Admin/AddProductStep2';
import DetailAD from './Admin/DetailAD';
import UpdateProduct from './Admin/UpdateProduct';
import SearchProduct from './Admin/SearchProduct';
import UpdateSize from './Admin/UpdateSize';
import UpdateIDProduct from './Admin/UpdateIDProduct';
import UpdateCategory from './Admin/UpdateCategory';
import Detail from './User/Detail';
import MyVoucher from './User/MyVoucher';
import MyAddress from './User/MyAddress';
import MyOrder from './User/MyOrder';
import Checkout from './User/Checkout';
import AddAddress from './User/AddAddress';
import OrderDetail from './User/OrderDetail';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}} />
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false}} />
                <Stack.Screen name="Main" component={Main} options={{ headerShown: false}} />
                <Stack.Screen name="Ad" component={Ad} options={{ headerShown: false}} />
                <Stack.Screen name="AddProduct" component={AddProductStep1} options={{ headerShown: false}} />
                <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false}} />
                <Stack.Screen name="AddVoucher" component={AddVoucher} options={{ headerShown: false}} />
                <Stack.Screen name="AddSlider" component={AddSlider} options={{ headerShown: false}} />
                <Stack.Screen name="AddProductStep2" component={AddProductStep2} options={{ headerShown: false}} />
                <Stack.Screen name="DetailAD" component={DetailAD} options={{ headerShown: false}} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false}} />
                <Stack.Screen name="SearchProduct" component={SearchProduct} options={{ headerShown: false}} />
                <Stack.Screen name="UpdateSize" component={UpdateSize} options={{ headerShown: false}} />
                <Stack.Screen name="UpdateIDProduct" component={UpdateIDProduct} options={{ headerShown: false}} />
                <Stack.Screen name="UpdateCategory" component={UpdateCategory} options={{ headerShown: false}} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false}} />
                <Stack.Screen name="MyVoucher" component={MyVoucher} options={{ headerShown: false}} />
                <Stack.Screen name="MyAddress" component={MyAddress} options={{ headerShown: false}} />
                <Stack.Screen name="MyOrder" component={MyOrder} options={{ headerShown: false}} />
                <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false}} />
                <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false}} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false}} />
                <Stack.Screen name="Search" component={SearchProduct} options={{ headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation