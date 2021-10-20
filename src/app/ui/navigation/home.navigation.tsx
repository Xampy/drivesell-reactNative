import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

import SellingProductStackNavigator from './home/selling-product.navigation';
import MessagingStackNavigator from './home/messages.navigation';
import NotificationsStackNavigator from './home/notifications.navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import ShopsStackNavigator from './shop.navigation';
import Octicons from 'react-native-vector-icons/Octicons';

const HomeTabBottom = createBottomTabNavigator();


const HomeTabBottomNavigator = () => {
    return (
        <HomeTabBottom.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }: any) => {
                    let iconName: string = "ios-information-circle";

                    if (route.name === 'Selling') {
                        return <AntDesign
                            name="CodeSandbox"
                            size={size}
                            color={color} />
                    }/* else if (route.name === 'Shops') {
                        return <Entypo
                            name="shop"
                            size={size}
                            color={color} />
                    } else if (route.name === 'Notifications') {
                        return <AntDesign
                            name="bells"
                            size={size}
                            color={color} />
                    } */else if (route.name === 'Messages') {
                        return <Octicons
                            name="comment-discussion"
                            size={size}
                            color={color} />
                    }
                },
            })}

            tabBarOptions={{
                activeTintColor: '#007ACC',
                inactiveTintColor: 'gray',
                keyboardHidesTabBar: true
            }}
            initialRouteName="Shop"> 
            <HomeTabBottom.Screen
                name="Selling"
                component={SellingProductStackNavigator} />
            {/*<HomeTabBottom.Screen
                name="Shops"
                component={ShopsStackNavigator} />
            <HomeTabBottom.Screen
                name="Notifications"
            component={NotificationsStackNavigator} />*/}
            <HomeTabBottom.Screen
                name="Messages"
                component={MessagingStackNavigator} />
        </HomeTabBottom.Navigator>
    )
}


export default HomeTabBottomNavigator;