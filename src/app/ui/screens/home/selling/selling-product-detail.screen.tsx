import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import ProductOrderModalComponent from '../../../components/product/core/product-order-modal.component';
import PriceDetailTopBarComponent from '../../../components/product/product-detail-top-bar.component';
import ProductImagesComponent from '../../../components/product/product-images.component';
import Octicons from 'react-native-vector-icons/Octicons';
import ShopEntity from '../../../../domain/entity/shop.entity';
import ShopProductEntity from '../../../../domain/entity/product.entity';
import BackWithTitleTopBarComponent from '../../../components/core/back-with-title-top-bar.component';


const user_icon = require('../../../../../assets/img/user_icon.png');

const shipping_data = [
    {
        title: "",
        data: ["Cash out available", "Cash on delivery available on all below 1000"]
    }
];

const detail_data = [
    {
        title: "",
        data: [
            "Textil, leather and synthetic upper offers durability",
            "Phylon foam, midsole gives cushioning and comfort",
            "Rubber pods help maintain the shape",
            "White/Clear Emeral/Total Orange/White",
            "Style: BQ5206-100",
            "Country/Region of origin: China"
        ]
    }
];

interface IProps {
    navigation: any,
    route: any
}

interface IState {
    hasWantToOrder: boolean,
    hasPlacedOrder: boolean
}

class SellingProductDetailScreen extends React.Component<IProps, IState> {

    private shop: ShopEntity;
    private shopProduct: ShopProductEntity;

    constructor(props: any) {
        super(props);


        this.state = {
            hasWantToOrder: false, //CHnage it to false later
            hasPlacedOrder: false
        }

        console.log(this.props);
        this.shop = this.props.route.params.shop;
        this.shopProduct = this.props.route.params.product;
    }


    private _renderOrderNowBtn = () => {
        if (!this.state.hasWantToOrder) {
            return (
                <TouchableOpacity
                    style={styles.bottom_float_buy_action_container}
                    onPress={() => { this._setOrderingModalVisible(true) }}>
                    <View style={styles.buy_text_container}>
                        <Text style={styles.buy_text} >Order now</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    private _setOrderingModalVisible = (visibile: boolean) => {
        this.setState({ hasWantToOrder: visibile });
    }


    private _handleOrderPlacement = () => {
        console.log("Render order +");
        this.setState({ hasPlacedOrder: true });

    }

    _renderOrderModal = () => {
        if (this.state.hasWantToOrder) {
            return (
                <ProductOrderModalComponent
                    product={this.shopProduct} shop={this.shop} 
                    hasWantToOrder={true}
                    hasPlacedOrder={this.state.hasPlacedOrder}
                    placeOrder={this._handleOrderPlacement}
                    onRequestCloseCallback={() => { this._setOrderingModalVisible(false); } }></ProductOrderModalComponent>
            )
        }
    }

    private _renderDescriptionRows = () => {
        return this.shopProduct.getShippings().map(
            (item, index) => {
                return (
                    <View key={"description_row_" + index} style={{ display: 'flex', flexDirection: 'row', marginTop: 9 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray' }} >{'\u2022'}</Text>
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={{ fontSize: 15, color: 'gray' }} >{item}</Text>
                        </View>
                    </View>
                )
            });
    }

    /**
     * Review this function
     */
    private _renderProductDetailRows = () => {
        return this.shopProduct.getDetails().map(
            (item, index) => {
                return (
                    <View key={"product_detail_row_" + index} style={{ display: 'flex', flexDirection: 'row', marginTop: 9 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray' }} >{'\u2022'}</Text>
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={{ fontSize: 15, color: 'gray' }} >{item}</Text>
                        </View>
                    </View>
                )
            }
        );
    }

    private _renderProductPriceContainer = () => {
        if (this.shopProduct.getReduction() > 0) {
            const p = (
                this.shopProduct.getPrice() -
                this.shopProduct.getPrice() * this.shopProduct.getReduction()
            ).toFixed(2)

            return (
                <View style={styles.product_price_container}>
                    <Text style={styles.product_price_old}>{this.shopProduct.getPrice()}$</Text>
                    <Text style={styles.product_price}>{p} $</Text>
                </View>
            )
        }
        return (
            <View style={styles.product_price_container}>

                <Text style={styles.product_price}>{
                    this.shopProduct.getPrice()} $</Text>
            </View>
        )
    }

    private _goBackNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderOrderModal()}
                <BackWithTitleTopBarComponent backCallback={this._goBackNavigation} title={this.shopProduct.getName()} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingBottom: 100 }}
                >
                    <View style={styles.data_container} >

                        <View style={styles.user_container} >
                            <View style={styles.user_image_container}>
                                <Image
                                    source={ (
                                        this.shop.getImageUrl() == null || this.shop.getImageUrl().length == 0
                                        ) ? user_icon : {uri: this.shop.getImageUrl()}}
                                    style={styles.user_icon}
                                />
                            </View>
                            <View style={styles.user_informations_container}>
                                <View style={styles.user_data_container}>
                                    <Text style={styles.username}>{this.shop.getName()}</Text>
                                    <Text style={styles.user_profil}>@see more</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Octicons name={"comment-discussion"} size={30} />
                                </View>
                            </View>
                        </View>


                        {/*<FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                            data={}
                            renderItem={this._renderProduct}
                            keyExtractor={(item) => item.id.toString()}
                        />*/}

                        <ProductImagesComponent
                            mainImageUri={(
                                this.shopProduct != undefined &&
                                this.shopProduct.getMainImage() != null) ? this.shopProduct.getMainImage() : null}
                            sub1ImageUri={(
                                this.shopProduct != undefined &&
                                this.shopProduct.getSubOneImage() != null) ? this.shopProduct.getSubOneImage() : null}
                            sub2ImageUri={(
                                this.shopProduct != undefined &&
                                this.shopProduct.getSubTwoImage() != null) ? this.shopProduct.getSubTwoImage() : null}
                            sub3ImageUri={(
                                this.shopProduct != undefined &&
                                this.shopProduct.getSubThreeImage() != null) ? this.shopProduct.getSubThreeImage() : null}
                            handleClick={
                                () => {

                                }
                            }>
                        </ProductImagesComponent>

                        <View style={styles.product_description_container}>

                            <View style={styles.product_top_description_container}>
                                <View style={styles.product_name_container}>
                                    <Text style={styles.product_name}>{this.shopProduct.getName()}</Text>
                                </View>
                                {this._renderProductPriceContainer()}
                            </View>

                            <View style={styles.product_description_text_container}>
                                <Text style={styles.section_header_title} >DESCRIPTION</Text>

                                <Text style={styles.description_text} >{this.shopProduct.getDescription()} </Text>

                                <View style={styles.shipping_container}>
                                    {this._renderDescriptionRows()}
                                </View>
                            </View>


                            <View style={styles.product_detail_container}>
                                <Text style={styles.section_header_title} >PRODUCT DETAIL</Text>

                                <View style={styles.shipping_container}>
                                    {this._renderProductDetailRows()}
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>

                {this._renderOrderNowBtn()}


            </View>
        )
    }
}

const styles = StyleSheet.create({

    //[START] main container styles

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    data_container: {
        padding: 10,
    },


    bottom_float_buy_action_container: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },

    buy_text_container: {
        width: 100,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#007ACC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },

    buy_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },




    user_container: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
    },

    user_icon: {
        width: 50,
        height: 50,
        borderRadius: 25
    },

    user_image_container: {
        flex: 1
    },
    user_informations_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 8
    },

    user_data_container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'flex-start'
    },


    username: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 6
    },

    user_profil: {
        color: 'gray',
        fontSize: 10,
        marginTop: 5
    },

    product_description_container: {
        padding: 10
    },

    product_description_text_container: {

    },
    product_detail_container: {
        marginTop: 10,
    },






    product_top_description_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    product_name_container: {
        flex: 4
    },
    product_price_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        flex: 2
    },
    product_name: {
        fontWeight: 'bold',
        fontSize: 22,

    },

    product_price: {
        fontWeight: 'bold',
        fontSize: 22,

    },
    product_price_old: {
        fontSize: 15,
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

    description_text: {
        fontSize: 15,
        color: 'gray',
        fontFamily: "Roboto"
    },



    shipping_container: {
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 10
    },


});

export default SellingProductDetailScreen;