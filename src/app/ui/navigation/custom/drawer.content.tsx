import * as React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

const user_icon = require("../../../../assets/img/user_icon.png")

class CustomDrawerContent extends React.Component {
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <DrawerContentScrollView {...this.props}>
                <View style={ styles.header }>
                    <Image
                        source={user_icon}
                        style={ styles.user_icon }
                    />

                    <Text style={ styles.username } >xampy</Text>
                    <View style={styles.stats_container}>
                        <View style={styles.stat_container}>
                            <Text style={ styles.stat_value } >1</Text>
                            <Text style={ styles.stat_field } >Shop(s)</Text>
                        </View>
                        <View style={ [styles.stat_container, , {marginLeft: 10}]}>
                            <Text style={ styles.stat_value } >3</Text>
                            <Text style={ styles.stat_field } >Sell order(s)</Text>
                        </View>
                    </View>
                </View>



                <DrawerItemList {...(this.props as any)} />
                <DrawerItem label="Help" onPress={() => console.log("Tests")} />
                <DrawerItem label="Policy & Privacy" onPress={() => console.log("Tests")} />
            </DrawerContentScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        paddingBottom: 50
    },
    user_icon: {
        width: 60,
        height: 60
    },

    username: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10
    },

    stats_container: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 20
    },

    stat_container: {
        display: 'flex',
        flexDirection: 'row'
    },

    stat_value: {
        fontWeight: 'bold'
    },

    stat_field: {
        color: 'gray',
        marginLeft: 10
    }

});


export default CustomDrawerContent;

