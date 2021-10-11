import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

class SellOrdersListItemComponent extends React.Component {
    render() {
        return (
            <View style={styles.buy_order_container} >
                <View style={styles.buy_order_icon_container}>
                    <Fontisto
                        name="shopping-bag-1"
                        size={20}
                        color={'blue'} />
                </View>
                <View style={styles.user_informations_container}>
                    <View style={styles.user_data_container}>
                        <View style={{ display: 'flex', flexDirection: 'row', 
                            alignItems: 'center', justifyContent: 'space-around', }}>
                            <Text style={styles.second_text}>12 jul 2021</Text>
                            <Text
                                style={
                                    [styles.second_text, {
                                        marginLeft: 10, fontSize: 10,
                                        fontWeight: 'bold', borderColor: 'blue',
                                        paddingLeft: 10, paddingRight: 10,
                                        paddingTop: 2, paddingBottom: 2, borderWidth: 1, borderRadius: 10
                                    }]}
                            >Pending</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.username}>Username</Text>
                            <Text style={[styles.second_text, { marginLeft: 10 }]}>1 &times; Headphone ASSUR</Text>
                        </View>

                    </View>
                    <View style={{ marginTop: 10 }}>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buy_order_container: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1
    },

    user_icon: {
        width: 40,
        height: 40
    },

    buy_order_icon_container: {
        flex: 1
    },
    user_informations_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 7
    },

    user_data_container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'flex-start'
    },


    username: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 6
    },

    second_text: {
        color: 'gray',
        fontSize: 15,
        marginTop: 5
    },
});

export default SellOrdersListItemComponent;