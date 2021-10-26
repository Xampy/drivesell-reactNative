import * as React from 'react';
import { Alert, Image, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopProductEntity from '../../../../domain/entity/product.entity';
import ShopEntity from '../../../../domain/entity/shop.entity';
import { getGPSDistance, requestLocationPermission } from '../../../location.tools';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const main_product_image = require("../../../../../assets/img/product/product_main.jpg");

const GOOGLE_API_KEY = "AIzaSyCFKpD2GztNGFknwr5rY-BPDaYoxfMlM04";



interface IProps {
    product: ShopProductEntity,
    shop: ShopEntity,
    hasWantToOrder: boolean,
    onRequestCloseCallback: Function,

    placeOrder: (shop: ShopEntity, product: ShopProductEntity) => any,
    hasPlacedOrder: boolean
}

interface IState {
    hasWantToOrder: boolean,
    hasPlacedOrder: boolean,
    userLocation: { latitude: number, longitude: number},
    fetchedDistance: any,
    fetchedDuration: any,
}


class ProductOrderModalComponent extends React.Component<IProps, IState> {
    private hasLocationPermission: boolean;

    constructor(props: any) {
        super(props);

        this.state = {
            hasWantToOrder: this.props.hasWantToOrder,
            hasPlacedOrder: this.props.hasPlacedOrder,
            userLocation: {
                latitude: +this.props.shop.getLatitude(), 
                longitude: +this.props.shop.getLongitude()
            },
            fetchedDistance: 0,
            fetchedDuration: 0,
        }

        console.log("state", this.state);
        this.hasLocationPermission = false;
    }

    componentDidMount() {
        requestLocationPermission().then(
            (value) => {
                if (value != null && value == true) {
                    this.hasLocationPermission = value;
                    Geolocation.getCurrentPosition(
                        (position) => {

                            const distance = getGPSDistance(
                                {latitude: position.coords.latitude, longitude: position.coords.longitude},
                                {latitude: +this.props.shop.getLatitude(), longitude: +this.props.shop.getLongitude()}
                            )
                            this.setState({
                                userLocation: {
                                    latitude: position.coords.latitude, 
                                    longitude: position.coords.longitude
                                },
                                fetchedDistance : distance
                            })
                        },
                        (error) => {
                            // See error code charts below.
                            console.log(error.code, error.message);
                            Alert.alert(
                                "User Location",
                                "An error occured, please try again..."
                            )
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                }

            }
        ).catch(
            (error) => {
                Alert.alert(
                    "Location Permission",
                    "An error occured, please try again..."
                )
            }
        )
    }

    private _setOrderingModalVisible(visible: boolean) {
        this.setState({ hasWantToOrder: visible });
    }

    private _placeOrder = () => {
        console.log("In modal " + this.state.hasPlacedOrder);
        //[FEATURE] let user to place order in next version
        //this.props.placeOrder(this.props.shop, this.props.product);
    }

    private _renderOrderPlacementStatus = () => {
        console.log("Render place order " + this.state.hasPlacedOrder);
        if (this.state.hasPlacedOrder == true) {
            return <FontAwesome name="check-circle" color="green" size={30} />;
        } else
            return (
                <TouchableOpacity onPress={this._placeOrder}>
                    <Text style={styles.modal_order_pay_btn} >Place Order</Text>
                </TouchableOpacity>
            );
    }

    private _renderProductPriceContainer = () => {
        if (this.props.product.getReduction() > 0) {
            const p = (
                this.props.product.getPrice() -
                this.props.product.getPrice() * this.props.product.getReduction()
            ).toFixed(2)

            return (
                <View style={styles.modal_product_price_container}>
                    <Text style={styles.modal_product_price}>{p} $</Text>
                    <Text style={styles.modal_product_price_old}>{this.props.product.getPrice()} $</Text>
                </View>
            )
        }
        return (
            <View style={styles.modal_product_price_container}>
                <Text style={styles.modal_product_price}>{this.props.product.getPrice()} $</Text>
            </View>

        )
    }

    private _renderProductImage = () => {
        const image = this.props.product.getMainImage();
        if (image != undefined && image != null) {
            return (
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                />
            )
        } else {
            return (
                <Image
                    source={main_product_image}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                />
            )
        }
    }

    private _reanderSafeProductName = (name: string) => {
        if (name.length > 20)
            return name.substring(0, 17) + "..."
        else
            return name
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
                                    showsUserLocation={true}
                                    zoomControlEnabled={true}
                                    minZoomLevel={15}
                                    initialRegion={{
                                        latitude: +this.props.shop.getLatitude(),
                                        longitude: +this.props.shop.getLongitude(),
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,

                                    }}>

                                    <Marker
                                        title={this.props.shop.getName()}
                                        description={this.props.shop.getDescription()}
                                        pinColor={"#007ACC"}
                                        coordinate={{
                                            latitude: +this.props.shop.getLatitude(),
                                            longitude: +this.props.shop.getLongitude()
                                        }}
                                    />

                                    {/* TODO Activate the enterprise goole direction */}
                                    <MapViewDirections
                                        apikey={GOOGLE_API_KEY}
                                        origin={this.state.userLocation}
                                        destination={{
                                            latitude: +this.props.shop.getLatitude(),
                                            longitude: +this.props.shop.getLongitude()
                                        }}
                                        strokeWidth={1}
                                        optimizeWaypoints={true}
                                        onReady={
                                            (result) => {
                                                console.log(result)
                                                this.setState({
                                                    fetchedDistance: result.distance,
                                                    fetchedDuration: result.duration,
                                                })
                                            }
                                        }
                                        onError={
                                            () => {
                                                //
                                            }
                                        }
                                    />

                                </MapView>

                                <View style={{
                                    margin: 20,
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <MaterialCommunityIcons name="map-marker-distance" size={20} />
                                        <Text style={{ marginLeft: 15 }}>{this.state.fetchedDistance} m</Text>
                                    </View>
                                    <View style={{
                                        marginLeft: 20,
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <FontAwesome5 name="walking" size={20} />
                                        <Text style={{ marginLeft: 15 }}>-- min</Text>
                                    </View>
                                </View>

                                <View style={styles.modal_image_data_container}>
                                    <View style={styles.modal_image_container}>
                                        {this._renderProductImage()}
                                    </View>
                                    <View style={styles.modal_product_description_container}>
                                        <View style={styles.modal_product_name_container}>
                                            <Text style={styles.modal_product_name}>
                                                {this._reanderSafeProductName(this.props.product.getName())}
                                            </Text>
                                        </View>
                                        {this._renderProductPriceContainer()}
                                        <View>
                                            {/*this._renderOrderPlacementStatus()*/}
                                            <Text>
                                                {this.props.product.getDescription()}
                                            </Text>
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
        backgroundColor: '#007ACC',
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