import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
import TitleTopBarComponent from '../../../components/core/title-top-bar.component';
import ShopDetailModalComponent from '../../../components/shop/ccore/shop-detail-modal.component';


const main_product_image = require("../../../../../assets/img/product/product_main.jpg");
const shopImage = require("../../../../../assets/img/shop/shop-default.jpg");

interface IProps {
    navigation: any,
}

interface IState {
    showMap: boolean
}

class ShopDetailScreen extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            showMap: false
        }
    }

    private _handleShopProductClicked = () => {
        this.props.navigation.navigate(
            "Shop-Product-Detail-Screen",
            {
                product: "1"
            }
        )
    }

    private _setViewingDetailModalVisible = (value: boolean) => {
        this.setState({ showMap: value });
    }

    private _renderShopGpsPlacementModal = () => {
        if (this.state.showMap) {
            return (
                <ShopDetailModalComponent
                    showMap={true}
                    hasChoosedShopProduct={
                        () => {
                            this.props.navigation.navigate(
                                "Shop-Item-Detail-Screen",
                                {
                                    product: "1"
                                }
                            )
                        }
                    }
                    onRequestCloseCallback={() => { this._setViewingDetailModalVisible(false) }} />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderShopGpsPlacementModal()}
                <TitleTopBarComponent title={"Shop"} />
                <ScrollView>

                    <View style={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20, marginBottom: 10}}>
                        <View style={{
                            maxWidth: '60%', display: 'flex', 
                            flexDirection: 'column', alignItems: 'center'}}>
                            <Image
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                                source={shopImage}
                            />
                            <Text style={{marginTop: 10, fontWeight: 'bold'}}> Computer {'\u0000'} Electronis</Text>
                            <Text>Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem  Lorem</Text>
                            
                            <TouchableOpacity onPress={
                                () => {
                                    this.setState({
                                        showMap: true
                                    })
                                }
                            }>
                                <Text style={[styles.modal_order_pay_btn, {backgroundColor: 'green'}]} >See Map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    

                    {
                        ["1", "2"].map(
                            (data) => {
                                return (
                                    <View key={data} style={styles.modal_image_data_container}>
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
                                                <TouchableOpacity onPress={() => {
                                                    this._handleShopProductClicked();
                                                }}>
                                                    <Text style={styles.modal_order_pay_btn} >View</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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

    modal_order_pay_btn: {
        backgroundColor: 'blue',
        color: '#FFFFFF',
        padding: 10,
        textAlign: 'center',
        borderRadius: 15,
        marginTop: 10
    },
});

export default ShopDetailScreen;
