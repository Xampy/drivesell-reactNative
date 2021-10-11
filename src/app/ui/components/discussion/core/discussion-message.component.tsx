import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


interface IProps {
    isForUser: boolean
    content: string,
}

interface IState {

}


class DiscussionMessageComponent extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);
    }

    private _renderMessageContainerStyle = () => {
        if(this.props.isForUser){
            return [styles.message_container, 
                {justifyContent: "flex-end", backgroundColor: "#007ACC", alignSelf: 'flex-end'}
            ];
        }else{
            return styles.message_container;
        }
    }

    private _renderMessageContentStyle = () => {
        if(this.props.isForUser){
            return [styles.message_text, {color: '#FFFFFF'}];
        }else{
            return styles.message_text;
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={ this._renderMessageContainerStyle() as any }>
                    <Text style={ this._renderMessageContentStyle() as any }>
                        {this.props.content}
                    </Text>
                    <Text style={
                        {fontSize: 10, marginTop: 10, 
                        color: this.props.isForUser ? "white" : "black"}}> 15: 05 PM GMT</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },

    message_container: {
        backgroundColor: "#F3F2EF",
        padding: 15,
        borderRadius: 10,
        width: 'auto',
        maxWidth: '80%',
        alignSelf: 'flex-start'
    },

    message_text: {
        fontSize: 15,
        color: "black",
        width: 'auto'
    }
});





export default DiscussionMessageComponent;