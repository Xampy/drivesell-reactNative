import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';


const user_icon = require('../../../../assets/img/user_icon.png')
const iconName: string = "ios-information-circle";

class PriceDetailTopBarComponent extends React.Component {

    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <View style={ styles.container } >
                <View>
                <Fontisto name={"arrow-left-l"} size={30} color={"#000000"}/>
                </View>
                <View>
                    <Text style={ styles.price }>25.05 $</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 60
    },

    user_icon:{
        width: 40,
        height: 40
    },

    price: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
});

export default PriceDetailTopBarComponent;