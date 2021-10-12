import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SecondaryMainTabBottomNavigator from "./home.navigation";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomDrawerContent from "./custom/drawer.content";
import Ionicons from "react-native-vector-icons/Ionicons";
import BuyOrdersStackNavigator from "./buy-orders.navigation";
import SellOrdersStackNavigator from "./sell-orders.navigation";
import NewProductScreen from "../screens/new-product.screen";
import SearchScreen from "../screens/home/search/search.screen";
import NewShopScreen from "../screens/new-shop.screen";
import AppContext from "../../app.context";
import ShopItemsListScreen from "../screens/shop-items-list.screen";
import MyShopsStackNavigator from "./my-shops.navigation";


const MainDrawer = createDrawerNavigator();

const MainDrawerNavigator = () => {

    const context: any | undefined = React.useContext(AppContext);
    console.log("In main drawer", context);
    return (

        <AppContext.Provider value={context}>
            <MainDrawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
                screenOptions={({ route }) => ({
                    drawerIcon: ({ focused, color, size }: any) => {
                        let iconName: string = "ios-information-circle";

                        if (route.name === 'Home') {
                            return <Entypo
                                name="home"
                                size={size}
                                color={color} />
                        } else if (route.name === 'New Product') {
                            return <Ionicons
                                name="add"
                                size={size}
                                color={color} />
                        } else if (route.name === 'Profile') {
                            return <FontAwesome
                                name="user"
                                size={size}
                                color={color} />
                        } else if (route.name === 'Buy Orders') {
                            return <Entypo
                                name="shopping-cart"
                                size={size}
                                color={color} />
                        } else if (route.name === 'Sell Orders') {
                            return <Fontisto
                                name="shopping-bag"
                                size={size}
                                color={color} />
                        } else if (route.name === 'New Shop') {
                            return <Ionicons
                                name="add"
                                size={size}
                                color={color} />
                        } else if (route.name === 'My Products') {
                            return <FontAwesome5
                                name="clipboard-list"
                                size={size}
                                color={color} />
                        } else if (route.name === 'My Shops') {
                            return <Fontisto
                                name="shopping-store"
                                size={size}
                                color={color} />
                        } else if (route.name === 'Settings') {
                            return <Fontisto
                                name="player-settings"
                                size={size}
                                color={color} />
                        }
                    },
                })}
                initialRouteName="My Products">
                <MainDrawer.Screen
                    name="Home"
                    component={SecondaryMainTabBottomNavigator} />


                <MainDrawer.Screen
                    name="Buy Orders"
                    component={BuyOrdersStackNavigator} />
                <MainDrawer.Screen
                    name="Profile"
                    component={SearchScreen} />

                <MainDrawer.Screen
                    name="My Business"
                    component={SearchScreen} />
                <MainDrawer.Screen
                    name="New Product">
                    {(props) => {
                        const p = { context: context, ...props }
                        return <NewProductScreen {...p} />
                    }}
                </MainDrawer.Screen>
                <MainDrawer.Screen
                    name="New Shop">
                    {(props) => {
                        const p = { context: context, ...props }
                        return <NewShopScreen {...p} />
                    }}
                </MainDrawer.Screen>
                <MainDrawer.Screen
                    name="My Products"
                    component={ShopItemsListScreen} />
                <MainDrawer.Screen
                    name="My Shops"
                    component={MyShopsStackNavigator} />
                <MainDrawer.Screen
                    name="Sell Orders"
                    component={SellOrdersStackNavigator} />
                <MainDrawer.Screen
                    name="Settings"
                    component={SearchScreen} />
            </MainDrawer.Navigator>
        </AppContext.Provider>
    )
}

export default MainDrawerNavigator;