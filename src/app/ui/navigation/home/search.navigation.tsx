import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/home/notifications/notifications-list.screen";
import SearchScreen from '../../screens/home/search/search.screen';

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
    return (
        <SearchStack.Navigator 
        initialRouteName="Search-Screen"
        screenOptions={
            {
                headerShown: false
            }
        }>
            
            <SearchStack.Screen 
                name="Search-Screen" component={SearchScreen}/> 
        </SearchStack.Navigator>
    )
}


export default SearchStackNavigator;