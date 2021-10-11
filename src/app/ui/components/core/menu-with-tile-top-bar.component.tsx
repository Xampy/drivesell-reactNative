import * as React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const user_icon = require('../../../../assets/img/user_icon.png')
const iconName: string = "ios-information-circle";



interface IProps {
    title: string,
    toggler: Function
}

interface IState {

}

class MenuWithTitleTopBarComponent extends React.Component<IProps, IState> {


    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container} >
                <View>
                    <TouchableOpacity onPress={
                        () => {
                            if(this.props.toggler != undefined)
                                this.props.toggler();
                        }
                    }>
                        <Feather name={"menu"} size={30} color={"#000000"} />
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

        elevation: 8

    },

    user_icon: {
        width: 40,
        height: 40
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
});

export default MenuWithTitleTopBarComponent;