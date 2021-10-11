import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SellingProductDetailScreen from '../screens/home/selling/selling-product-detail.screen';
import ShopDetailScreen from '../screens/home/shop/shop-detail.screen';
import ShopsListScreen from '../screens/home/shop/shops-list.screen';

const ShopsStack = createStackNavigator();

const ShopsStackNavigator = () => {
    return (
        <ShopsStack.Navigator
            initialRouteName="Shop-List-Screen"
            screenOptions={
                {
                    headerShown: false
                }
            }>
            
            <ShopsStack.Screen
                name="Shop-List-Screen" component={ShopsListScreen} />
            <ShopsStack.Screen name="Shop-Detail-Screen" component={ShopDetailScreen}/>
            <ShopsStack.Screen 
                name="Shop-Product-Detail-Screen" 
                component={SellingProductDetailScreen}/>
        </ShopsStack.Navigator>
    )
}


export default ShopsStackNavigator;