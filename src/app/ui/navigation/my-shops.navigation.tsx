import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopsListScreen from '../screens/my-shops/shops-list.screen';
import ShopUpdateScreen from '../screens/my-shops/shop-update.screen';
import AppContext from '../../app.context';

const MyShopsStack = createStackNavigator();

const MyShopsStackNavigator = () => {

    const context: any | undefined = React.useContext(AppContext);
    console.log("\n\n\n\nIn my shops statck navigation", context);

    return (
        <MyShopsStack.Navigator
            initialRouteName="Shops-List-Screen"
            screenOptions={
                {
                    headerShown: false
                }
            }>


            <MyShopsStack.Screen
                name="Shops-List-Screen" component={ShopsListScreen}/>
            <MyShopsStack.Screen
                name="Shop-Update-Screen">
                    {(props) => {
                        const p = { context: context, ...props }
                        return <ShopUpdateScreen {...p} />
                    }}
                </MyShopsStack.Screen>
        </MyShopsStack.Navigator>
    )
}


export default MyShopsStackNavigator;