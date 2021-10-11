import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const user_icon = require('../../../../assets/img/user_icon.png')
const iconName: string = "ios-information-circle";
class DefaultTopBarComponent extends React.Component {

    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <View style={ styles.container } >
                <View>
                    {/*<Image
                        source={ user_icon }
                        style={styles.user_icon}
                    />*/}
                    <Text style={{fontSize: 25}}>DriveSell</Text>
                </View>
                <View></View>
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
        borderBottomWidth: 0,
        height: 60
    },

    user_icon:{
        width: 40,
        height: 40
    }
});

export default DefaultTopBarComponent;