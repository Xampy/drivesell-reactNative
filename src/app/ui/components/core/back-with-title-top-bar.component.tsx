import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const user_icon = require('../../../../assets/img/user_icon.png')
const iconName: string = "ios-information-circle";



interface IProps {
    title: string,
    backCallback: Function
}

interface IState {

}

class BackWithTitleTopBarComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container} >
                <View>
                    <TouchableOpacity onPress={() => {
                        this.props.backCallback();
                            
                    }}>
                        <AntDesign name={"arrowleft"} size={30} color={"#FFFFFF"} />
                    </TouchableOpacity>

                    
                </View>
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#007ACC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 8

    },

    user_icon: {
        width: 40,
        height: 40
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "white"
    },
});

export default BackWithTitleTopBarComponent;