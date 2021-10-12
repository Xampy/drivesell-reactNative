import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopsListScreen from '../screens/my-shops/shops-list.screen';
import ShopUpdateScreen from '../screens/my-shops/shop-update.screen';

const MyShopsStack = createStackNavigator();

const MyShopsStackNavigator = () => {
    return (
        <MyShopsStack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }>


            <MyShopsStack.Screen
                name="Shops-List-Screen" component={ShopsListScreen} />
            <MyShopsStack.Screen
                name="Shop-Items-List-Screen" component={ShopUpdateScreen} />
        </MyShopsStack.Navigator>
    )
}


export default MyShopsStackNavigator;