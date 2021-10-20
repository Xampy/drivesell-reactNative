import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

const user_icon = require("../../../../assets/img/user_icon.png");

interface IProps {
    backCallback: Function
}

interface ISate {

}

class DiscussionTopBarComponent extends React.Component<IProps, ISate> {
    constructor(props: any){
        super(props)
    }

    render() {
        return (
            <View style={styles.user_container} >
                <View>
                    <TouchableOpacity onPress={() => {
                        this.props.backCallback();
                            
                    }}>
                        <AntDesign name={"arrowleft"} size={30} color={"#FFFFFF"} />
                    </TouchableOpacity>

                    
                </View>
                <View style={styles.user_image_container}>
                    <Image
                        source={user_icon}
                        style={styles.user_icon}
                    />
                </View>
                <View style={styles.user_informations_container}>
                    <View style={styles.user_data_container}>
                        <Text style={styles.username}>Xampy</Text>
                        <Text style={styles.user_profil}>viewed at 22 july 2020 04:09 PM</Text>
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
        backgroundColor: '#007ACC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
        width: 35,
        height: 35
    },

    user_image_container: {
        marginLeft: 5
    },
    user_informations_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5
    },

    user_data_container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },


    username: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 6,
        color: "white"
    },

    user_profil: {
        color: 'white',
        fontSize: 10
    },
});

export default DiscussionTopBarComponent;