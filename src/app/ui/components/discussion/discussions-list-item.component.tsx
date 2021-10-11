import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

const user_icon = require("../../../../assets/img/user_icon.png");

class DiscussionsListItemComponent extends React.Component {
    render() {
        return (
            <View style={styles.user_container} >
                <View style={styles.user_image_container}>
                    <Image
                        source={user_icon}
                        style={styles.user_icon}
                    />
                </View>
                <View style={styles.user_informations_container}>
                    <View style={styles.user_data_container}>
                        <Text style={styles.username}>Xampy</Text>
                        <Text style={styles.user_profil}>Can I see another exemple?</Text>
                    </View>
                    <View style={{ marginTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        {/*<Entypo name={"dots-three-vertical"} size={20} />*/}
                        <Text style={{fontSize: 11}}>1:04 PM</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    user_container: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        marginTop: 10,
        shadowColor: "#000",
    },

    user_icon: {
        width: 60,
        height: 60
    },

    user_image_container: {
        flex: 1
    },
    user_informations_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 6
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

    user_profil: {
        color: 'gray',
        fontSize: 10,
        marginTop: 5
    },
});

export default DiscussionsListItemComponent;