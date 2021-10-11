import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/home/notifications/notifications-list.screen";

const NotificationsStack = createStackNavigator();

const NotificationsStackNavigator = () => {
    return (
        <NotificationsStack.Navigator 
        initialRouteName="Notifications-List-Screen"
        screenOptions={
            {
                headerShown: false
            }
        }>
            
            <NotificationsStack.Screen 
                name="Notifications-List-Screen" component={NotificationsScreen}/> 
        </NotificationsStack.Navigator>
    )
}


export default NotificationsStackNavigator;