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
import React, {  } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppContext, { AppContextInterface } from './src/app/app.context';
import AppContainer from './src/app/share/container/app.container';

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './src/app/ui/store';
import AppStackNavigator from './src/app/ui/navigation/app.navigation';





const App = (props: any) => {
    if (__DEV__) {
        firestore().useEmulator('localhost', 8080);
        storage().useEmulator('localhost', 9199);
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
    

    return (
        /*<SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            
        </SafeAreaView>*/

        <Provider store={store}>
            <AppContext.Provider value={contextValue}>
            <NavigationContainer>
                    <AppStackNavigator></AppStackNavigator>
                </NavigationContainer>
            </AppContext.Provider>
        </Provider>
    );
};

const styles = StyleSheet.create({

});


export default App;
