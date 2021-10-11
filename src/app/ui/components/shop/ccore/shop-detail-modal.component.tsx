import * as React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



interface IProps {
    showMap: boolean,
    onRequestCloseCallback: Function,

    hasChoosedShopProduct: Function,
}

interface IState {
    showMap: boolean
}


class ShopDetailModalComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            showMap: true
        }

        console.log("state", this.state);
    }

    private _setViewingDetailModalVisible(visible: boolean) {
        this.setState({ showMap: visible });
    }




    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                presentationStyle={"overFullScreen"}
                statusBarTranslucent={true}
                visible={this.state.showMap}
                onRequestClose={() => {
                    this._setViewingDetailModalVisible(false);
                    this.props.onRequestCloseCallback();
                }}
            >
                <View style={styles.modal_opacity_container}></View>
                <View style={styles.modal_data_container}>
                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>

                            <View style={{ width: '100%', height: 500 }}>
                                <MapView
                                    style={{ flex: 1, margin: 0, padding: 0 }}
                                    provider={PROVIDER_GOOGLE}

                                    initialRegion={{
                                        latitude: 37.78825,
                                        longitude: -122.4324,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,

                                    }}
                                ></MapView>
                            </View>
                            <View style={{
                                margin: 20,
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',

                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <MaterialCommunityIcons name="map-marker-distance" size={20} />
                                    <Text style={{ marginLeft: 15 }}>1 km</Text>
                                </View>
                                <View style={{
                                    marginLeft: 20,
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <AntDesign name="clockcircleo" size={20} />
                                    <Text style={{ marginLeft: 15 }}>10 min</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
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
        top: 0,
        left: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },

    modalView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 100,
        backgroundColor: "white",
        borderRadius: 0,
        padding: 0,
        alignItems: "center",
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
});

export default ShopDetailModalComponent;