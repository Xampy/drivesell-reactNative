/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppContext, { AppContextInterface } from './src/app/app.context';
import AppContainer from './src/app/share/container/app.container';
import MainDrawerNavigator from './src/app/ui/navigation/main.navigation';

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './src/app/ui/store';
import { ADD_USER_SHOP, UserShopActionType } from './src/app/ui/store/myShop/type';
import ShopEntity from './src/app/domain/entity/shop.entity';





const App = (props: any) => {
    if (__DEV__) {
        firestore().useEmulator('localhost', 8080);
        firestore().settings({
            cacheSizeBytes: 50 * 1000000
        })
    }

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const container = new AppContainer();
    const contextValue: AppContextInterface = {
        appContainer: container
    }
    console.log("In App ", contextValue);

    const store = createStore(rootReducer);

    /*const dispatch = useDispatch();

    Use it on a SPLASH_SCREEN
    
    useEffect(() => {
        //Dispatch the local shop and products to others component
        console.log("\n\nComponent did mount")
        console.log(container);
        console.log("\n\n");
        console.log("In App : props \n");
        console.log(props.dispatch);

        container.storageFactory.getLocalStorage().storage.shops.forEach(
            (shop) => {
                let p = shop as unknown as ShopEntity;
                let action: UserShopActionType = {
                    type: ADD_USER_SHOP,
                    payload: p
                }
            }
        )

    }, [])*/

    return (
        /*<SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            
        </SafeAreaView>*/

        <Provider store={store}>
            <AppContext.Provider value={contextValue}>
                <NavigationContainer>
                    <MainDrawerNavigator></MainDrawerNavigator>
                </NavigationContainer>
            </AppContext.Provider>
        </Provider>
    );
};

const styles = StyleSheet.create({

});


export default App;
