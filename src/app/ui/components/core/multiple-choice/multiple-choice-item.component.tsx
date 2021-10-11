import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface IProps {
    text: string,
    isActive: boolean,
    size: "small" | "medium" | "large" | undefined
}

interface IState {
    isActive: boolean
}

class MultipleChoiceItemComponent extends React.Component<IProps, IState> {

    private textSizes: any = {
        "small": 5,
        "medium": 11,
        "large": 20
    };

    constructor(props: any){
        super(props);

        this.state = {
            isActive: this.props.isActive
        }
    }

    private _renderStyle = () => {
        if(this.state.isActive){
            return styles.item_active
        }

        return styles.item
    }

    render(){
        return(
            <View style={styles.container} >
                <TouchableOpacity
                    onPress={() => {
                        const isActive = this.state.isActive;
                        this.setState(
                            {
                                isActive: !isActive
                            }
                        )
                    }}>
                    <Text style={[this._renderStyle(), {
                        fontSize: this.props.size != undefined ? this.textSizes[this.props.size] : 11
                    }]}>{this.props.text}</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignSelf: 'flex-start',
        marginLeft: 10,
        padding: 5
    },

    item: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        color: "gray",
        fontSize: 11,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        fontWeight: 'bold'
    },

    item_active: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        color: "#FFFFFF",
        backgroundColor: "blue",
        borderWidth: 1,
        borderColor: 'blue',
        fontSize: 11,
        borderRadius: 10,
        fontWeight: 'bold'
    }
});

export default MultipleChoiceItemComponent;