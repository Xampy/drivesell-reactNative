import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const user_icon = require("../../../../assets/img/user_icon.png");

class NotificationsListItem extends React.Component {
    render() {
        return (
            <View style={styles.notification_container} >
                <View style={styles.notification_icon_container}>
                    <Image
                        source={user_icon}
                        style={styles.user_icon}
                    />
                </View>
                <View style={styles.user_informations_container}>
                    <View style={styles.user_data_container}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.second_text}>Buy order</Text>
                            <Text style={[styles.second_text, { marginLeft: 10 }]}>{'\u2022'} 2h ago</Text>
                        </View>
                        
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.username}>Xampy</Text>
                            <Text style={[styles.second_text, { marginLeft: 10 }]}>order an item</Text>
                        </View>

                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Entypo name={"dots-three-vertical"} size={20} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    notification_container: {
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

    notification_icon_container: {
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

export default NotificationsListItem;