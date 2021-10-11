import * as React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const main_product_image = require("../../../../../assets/img/product/product_main.jpg");

interface IProps {
    hasWantToOrder: boolean,
    onRequestCloseCallback: Function,

    placeOrder: Function,
    hasPlacedOrder: boolean
}

interface IState {
    hasWantToOrder: boolean,
    hasPlacedOrder: boolean
}


class ProductOrderModalComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            hasWantToOrder: this.props.hasWantToOrder,
            hasPlacedOrder: this.props.hasPlacedOrder
        }

        console.log("state", this.state);
    }

    private _setOrderingModalVisible(visible: boolean) {
        this.setState({ hasWantToOrder: visible });
    }

    private _placeOrder = () => {
        console.log("In modal " + this.state.hasPlacedOrder);
        this.props.placeOrder();
    }

    private _renderOrderPlacementStatus = () => {
        console.log("Render place order " + this.state.hasPlacedOrder );
        if(this.state.hasPlacedOrder == true){
            return <FontAwesome name="check-circle" color="green" size={30}/>;
        }else
            return (
                <TouchableOpacity onPress={this._placeOrder}>
                    <Text style={styles.modal_order_pay_btn} >Place Order</Text>
                </TouchableOpacity>
            );
    }

    
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                presentationStyle={"overFullScreen"}
                statusBarTranslucent={true}
                visible={this.state.hasWantToOrder}
                onRequestClose={() => {
                    this._setOrderingModalVisible(false);
                    this.props.onRequestCloseCallback();
                }}
            >
                <View style={styles.modal_opacity_container}></View>
                <View style={styles.modal_data_container}>
                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>

                            <View style={
                                {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    marginTop: 0,
                                }
                            }>

                                <MapView
                                    style={{ flex: 1 }}
                                    provider={PROVIDER_GOOGLE}
                        
                                    initialRegion={{
                                        latitude: 37.78825,
                                        longitude: -122.4324,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,

                                    }}
                                ></MapView>

                                <View style={{
                                    margin: 20,
                                    display: 'flex',
                                    flexDirection:'row'}}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection:'row'}}>
                                        <MaterialCommunityIcons name="map-marker-distance" size={20} />
                                        <Text style={{marginLeft: 15}}>1 km</Text>
                                    </View>
                                    <View style={{
                                        marginLeft: 20,
                                        display: 'flex',
                                        flexDirection:'row'}}>
                                        <AntDesign name="clockcircleo" size={20} />
                                        <Text style={{marginLeft: 15}}>10 min</Text>
                                    </View>
                                </View>

                                <View style={styles.modal_image_data_container}>
                                    <View style={styles.modal_image_container}>
                                        <Image
                                            source={main_product_image}
                                            style={{ width: 100, height: 100, resizeMode: 'contain' }}
                                        />
                                    </View>
                                    <View style={styles.modal_product_description_container}>
                                        <View style={styles.modal_product_name_container}>
                                            <Text style={styles.modal_product_name}>Headphone ASSUR</Text>
                                        </View>
                                        <View style={styles.modal_product_price_container}>
                                            <Text style={styles.modal_product_price}>25 $</Text>
                                            <Text style={styles.modal_product_price_old}>30 $</Text>
                                        </View>
                                        <View>
                                            { this._renderOrderPlacementStatus() }
                                        </View>
                                    </View>
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

export default ProductOrderModalComponent;