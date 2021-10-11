import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

const user_icon = require("../../../../assets/img/user_icon.png");

class DiscussionTopBarComponent extends React.Component {
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
                        <Text style={styles.user_profil}>@see more</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        {/*<Entypo name={"dots-three-vertical"} size={20} />*/}
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    user_icon: {
        width: 50,
        height: 50
    },

    user_image_container: {
        flex: 1
    },
    user_informations_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 8
    },

    user_data_container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'center'
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

export default DiscussionTopBarComponent;