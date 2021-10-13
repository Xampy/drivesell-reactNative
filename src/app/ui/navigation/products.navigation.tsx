import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AppContext from "../../app.context";
import ShopItemsListScreen from '../screens/product/shop-items-list.screen';
import UpdateShopProductScreen from '../screens/product/update-product.screen';

const MyShopsProductsStack = createStackNavigator();

const MyShopsProductsProductsStackNavigator = () => {

    const context: any | undefined = React.useContext(AppContext);
    console.log("\n\n\n\nIn my products statck navigation", context);

    return (
        <MyShopsProductsStack.Navigator
            initialRouteName="Shops-Products-List-Screen"
            screenOptions={
                {
                    headerShown: false
                }
            }>


            <MyShopsProductsStack.Screen
                name="Shops-Products-List-Screen" 
                component={ShopItemsListScreen} 
                initialParams={{context: context}}></MyShopsProductsStack.Screen>
                    {/*{(props) => {
                        const p = { context: context, ...props }
                        return <ShopItemsListScreen {...p} />
                    }}*/}
            <MyShopsProductsStack.Screen
                name="Shop-Product-Update-Screen" >
                    {(props) => {
                        const p = { context: context, ...props }
                        return <UpdateShopProductScreen {...p} />
                    }}
                </MyShopsProductsStack.Screen>
        </MyShopsProductsStack.Navigator>
    )
}


export default MyShopsProductsProductsStackNavigator;