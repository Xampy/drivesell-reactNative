import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SellingProductDetailScreen from '../../screens/home/selling/selling-product-detail.screen';
import SellingProductScreen from '../../screens/home/selling/selling-product.screen';

const SellingProductStack = createStackNavigator();

const SellingProductStackNavigator = () => {
    return (
        <SellingProductStack.Navigator 
        initialRouteName="Selling-Screen"
        screenOptions={
            {
                headerShown: false
            }
        }>
            
            <SellingProductStack.Screen 
                name="Selling-Screen" component={SellingProductScreen}/> 
            <SellingProductStack.Screen 
                name="Selling-Product-Detail-Screen" component={SellingProductDetailScreen}/> 
        </SellingProductStack.Navigator>
    )
}


export default SellingProductStackNavigator;