import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
const MyShopsStack = createStackNavigator();

const MyShopsStackNavigator = () => {
    return (
        <MyShopsStack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }>

        </MyShopsStack.Navigator>
    )
}


export default MyShopsStackNavigator;