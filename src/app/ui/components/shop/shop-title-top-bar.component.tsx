import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';


//const user_icon = require('../../../assets/img/user_icon.png');
const iconName: string = "ios-information-circle";



interface IProps {
    title: string
}

interface IState {

}

class ShopTitleTopBarComponent extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <View style={ styles.container } >
                <View>
                </View>
                <View>
                    <Text style={ styles.title }>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#FFFFFF',
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

        elevation: 4
    },

    user_icon:{
        width: 40,
        height: 40
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
});

export default ShopTitleTopBarComponent;