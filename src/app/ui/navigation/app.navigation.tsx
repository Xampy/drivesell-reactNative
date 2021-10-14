import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MainDrawerNavigator from "./main.navigation";

import SplashScreen from '../screens/splash/splash.screen';
import AppContext from '../../app.context';

const AppStack = createStackNavigator();

const AppStackNavigator = () => {
    const context: any | undefined = React.useContext(AppContext);
    console.log("In app stack navigator", context);

    return (
        <AppStack.Navigator
            initialRouteName="Splash-Screen"
            screenOptions={
                {
                    headerShown: false
                }
            }>
            
            <AppStack.Screen
                name="Splash-Screen" component={SplashScreen} initialParams={{}} />
            <AppStack.Screen name="Main-Screen" 
                component={MainDrawerNavigator}/>
        </AppStack.Navigator>
    )
}


export default AppStackNavigator;