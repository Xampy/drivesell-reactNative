import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SellOrderDetailScreen from '../screens/sell-orders/sell-order-detail.screen';
import SellOrdersScreen from '../screens/sell-orders/sell-orders.screen';

const SellOrdersStack = createStackNavigator();

const SellOrdersStackNavigator = () => {
    return (
        <SellOrdersStack.Navigator 
        initialRouteName="Sell-Orders-List-Screen"
        screenOptions={
            {
                headerShown: false
            }
        }>
             
            <SellOrdersStack.Screen 
                name="Sell-Orders-List-Screen" component={SellOrdersScreen}/> 
            <SellOrdersStack.Screen 
                name="Sell-Order-Detail-Screen" component={ SellOrderDetailScreen }/> 
        </SellOrdersStack.Navigator>
    )
}


export default SellOrdersStackNavigator;