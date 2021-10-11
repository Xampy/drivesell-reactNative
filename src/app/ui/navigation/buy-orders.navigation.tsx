import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import BuyOrderDetailScreen from '../screens/buy-orders/buy-order-detail.screen';
import BuyOrdersScreen from '../screens/buy-orders/buy-orders.screen';

const BuyOrdersStack = createStackNavigator();

const BuyOrdersStackNavigator = () => {
    return (
        <BuyOrdersStack.Navigator 
        initialRouteName="Buy-Order-Detail-Screen"
        screenOptions={
            {
                headerShown: false
            }
        }>
             
            <BuyOrdersStack.Screen 
                name="Buy-Orders-List-Screen" component={BuyOrdersScreen}/> 
            <BuyOrdersStack.Screen 
                name="Buy-Order-Detail-Screen" component={ BuyOrderDetailScreen }/> 
        </BuyOrdersStack.Navigator>
    )
}


export default BuyOrdersStackNavigator;