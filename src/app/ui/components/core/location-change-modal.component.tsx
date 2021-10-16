import * as React from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopDetailModalComponent from '../shop/ccore/shop-detail-modal.component';

interface IProps {
    city: string,
    provinceOrRegion: string,
    country: string,

    onRequestCloseCallback: Function,
    showModal: boolean
}

interface IState {
    showModal: boolean,
    city: string,
    provinceOrRegion: string,
    country: string,
}


class LocationChangeModalComponent extends React.Component<IProps, IState> {


    private city: string = "";
    private provinceOrRegion: string = "";
    private country: string = "";

    constructor(props: any) {
        super(props);

        this.state = {
            showModal: this.props.showModal,
            city: this.props.city,
            provinceOrRegion: this.props.provinceOrRegion,
            country: this.props.country
        }



        console.log("\n\n\state", this.state);
    }

    componentDidMount(){
        console.log("Loation modal mount")
        console.log("\n\n\state", this.state);
    }

    private _setVisible(visible: boolean) {
        this.setState({ showModal: visible });
    }

    private _loadProducts = () => {
        this._setVisible(false);
        this.props.onRequestCloseCallback(
            {
                city: this.city,
                country: this.country,
                provinceOrRegion: this.provinceOrRegion
            }
        );
    }

    render() {
        return (
            <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Modal
                animationType="fade"
                transparent={true}
                presentationStyle={"overFullScreen"}
                statusBarTranslucent={true}
                visible={this.state.showModal}
                onRequestClose={() => {
                    this._loadProducts()
                }}
            >
               
                <View style={styles.modal_opacity_container}></View>
                <View style={styles.modal_data_container}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={{ width: '80%' }}>
                                <View>
                                    <Text style={styles.editor_section_header}>Choose Location</Text>
                                </View>

                                <View style={styles.editor_section_container}>
                                    <Text style={styles.editor_section_title}>Country</Text>
                                    <TextInput
                                        defaultValue={this.state.country}
                                        onChangeText={(text) => { this.country = "" + text }}
                                    />
                                </View>
                                <View style={styles.editor_section_container}>
                                    <Text style={styles.editor_section_title}>Province/Region</Text>
                                    <TextInput
                                        defaultValue={this.state.provinceOrRegion}
                                        onChangeText={(text) => { this.provinceOrRegion = "" + text }}
                                    />
                                </View>
                                <View style={styles.editor_section_container}>
                                    <Text style={styles.editor_section_title}>City</Text>
                                    <TextInput
                                        defaultValue={this.state.city}
                                        onChangeText={(text) => { this.city = "" + text }}
                                    />
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 10 }}>
                                    <TouchableOpacity onPress={this._loadProducts}>
                                        <Text style={{
                                            color: '#FFFFFF',
                                            backgroundColor: "blue",
                                            borderRadius: 10,
                                            textAlign: 'center',
                                            paddingTop: 10, paddingBottom: 10

                                        }} >Search</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                
            </Modal>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    modal_opacity_container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "#000000",
        opacity: 0.5
    },
    modal_data_container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 300
    },

    modalView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 100,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 0,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },


    modal_order_pay_btn: {
        backgroundColor: 'blue',
        color: '#FFFFFF',
        padding: 10,
        textAlign: 'center',
        borderRadius: 15,
        marginTop: 10
    },

    range_btn_container: {
        borderRadius: 15,
        width: 30,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },

    range_btn_text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },

    modal_image_data_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10
    },

    modal_image_container: {
        flex: 1,
    },
    modal_product_description_container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },



    modal_product_name_container: {

    },
    modal_product_price_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    modal_product_name: {
        fontWeight: 'bold',
        fontSize: 15,

    },

    modal_product_price: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    modal_product_price_old: {
        fontSize: 12,
        marginLeft: 10,
        textDecorationStyle: 'solid',
        textDecorationLine: 'line-through',
        color: 'green'
    },


    section_header_title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'gray',
        marginTop: 10,
        marginBottom: 10,
    },




    editor_section_container: {
        marginTop: 10
    },
    editor_section_header: {
        color: 'gray',
        fontWeight: 'bold',
        marginTop: 15
    },
    editor_section_title: {
        color: 'gray'
    },
});

export default LocationChangeModalComponent;