import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscussionMessageComponent from '../../../components/discussion/core/discussion-message.component';
import DiscussionTopBarComponent from '../../../components/discussion/discussion-top-bar.component';





interface IProps {
    navigation: any,
    router: any
}

interface IState {
    messages: any[]
}

class DiscussionSingleScreen extends React.Component<IProps, IState> {

    private msgInputText: string = "";

    constructor(props: any) {
        super(props);

        this.state = {
            messages: []
        }
    }

    private _handleSendClick = () => {
        const msg = {
            id: "" + this.state.messages.length + 1,
            isUser: true,
            content: this.msgInputText
        }

        const messages = [...this.state.messages, msg];

        this.setState({
            messages: messages
        });

        console.log(this.state.messages);
    }

    private _goBackNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <DiscussionTopBarComponent backCallback={this._goBackNavigation} ></DiscussionTopBarComponent>
                <View style={styles.messages_container}>
                    <FlatList
                        style={{ paddingBottom: 50 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.messages}
                        renderItem={({ item }) => {
                            return <DiscussionMessageComponent
                                isForUser={item.isUser}
                                content={item.content} ></DiscussionMessageComponent>
                        }}
                        keyExtractor={(item) => item.id}
                    />

                </View>

                <View style={styles.message_input_container}>
                    <View style={{ flex: 5 }}>
                        <TextInput
                            style={styles.message_input}
                            placeholder="type here"
                            onChangeText={
                                (text: string) => {
                                    this.msgInputText = text;
                                }
                            }

                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={this._handleSendClick}>
                            <MaterialCommunityIcons name={"send-circle"} color={"#007ACC"} size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    messages_container: {
        padding: 10
    },
    message_input_container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 8,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFFFFF'
    },
    message_input: {
        width: '100%',
        height: 50,
        borderWidth: 0,
        backgroundColor: "#F2F2F2",
        borderRadius: 20,
        padding: 5
    }
});


const messages_data = [
    {
        id: "1",
        isUser: false,
        content: "Hi"
    },
    {
        id: "2",
        isUser: false,
        content: "Want to have more information on the headphone product"
    },
    {
        id: "3",
        isUser: true,
        content: "What do you want to know"
    },

    {
        id: "4",
        isUser: true,
        content: "What do you want to know"
    },
    {
        id: "5",
        isUser: true,
        content: "What do you want to know"
    },

    {
        id: "6",
        isUser: false,
        content: "What do you want to know"
    },

    {
        id: "7",
        isUser: true,
        content: "What do you want to know"
    },

    {
        id: "8",
        isUser: false,
        content: "What "
    },

    {
        id: "9",
        isUser: true,
        content: "What do you want to know"
    },

    {
        id: "10",
        isUser: true,
        content: "What do y"
    },


]

export default DiscussionSingleScreen;