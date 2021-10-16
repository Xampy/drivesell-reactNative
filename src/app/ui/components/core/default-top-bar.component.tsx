import * as React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const user_icon = require('../../../../assets/img/user_icon.png')
const iconName: string = "ios-information-circle";

interface IProps {
    toggler: Function,
    filterProductsByNameHandler: Function
}

interface IState {
    searchIsOpened: boolean
}

class DefaultTopBarComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            searchIsOpened: false
        }
    }

   

    private _setSearchVisibility = (val: boolean) => {
        this.setState({ searchIsOpened: val });
    }

    private _searchTextHandler = (text: string) => {
        if(text.length > 0){
            this.props.filterProductsByNameHandler(text);
        }
    }

    private _renderSearchInput = () => {
        if (this.state.searchIsOpened) {
            return (
                <View style={{ flex: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                    onChangeText={this._searchTextHandler}
                        placeholder={"search here"}
                        placeholderTextColor="#FFFFFF"
                        underlineColorAndroid="#FFFFFF"
                        style={{ flex: 1, color: '#FFFFFF' }}

                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name={"place"} size={25} color={"#FFFFFF"} />
                    <Text style={{marginLeft: 10, color: '#FFFFFF' }}>Lome, Maritime-Togo</Text>
                </View>
            )

        }
    }

    private _renderSearchIcon = () => {
        if (!this.state.searchIsOpened) {
            return (
                <TouchableOpacity onPress={
                    () => {
                        this._setSearchVisibility(true);
                    }
                }
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name={"search"} size={30} color={"#FFFFFF"} />
                </TouchableOpacity>

            )
        }

        return (
            <TouchableOpacity onPress={
                () => {
                    this._setSearchVisibility(false);
                }
            }
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name={"close"} size={30} color={"#FFFFFF"} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={
                        () => {
                            if (this.props.toggler != undefined)
                                this.props.toggler();
                        }
                    }
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name={"menu"} size={30} color={"#FFFFFF"} />
                    </TouchableOpacity>
                </View>
                {this._renderSearchInput()}
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {this._renderSearchIcon()}
                    <MaterialIcons name={"filter-list"} size={30} color={"#FFFFFF"} style={{ marginLeft: 10 }} />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 0,
        height: 60
    },

    user_icon: {
        width: 40,
        height: 40
    }
});

export default DefaultTopBarComponent;