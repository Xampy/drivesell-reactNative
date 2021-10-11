import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TitleTopBarComponent from '../../components/core/title-top-bar.component';
import BuyOrderConfirmationModal from '../../components/orders/core/buy-order-confirmation-modal.component';


const product_image = require("../../../../assets/img/product/product_main.jpg");


interface IProps {

}

interface IState {
    showConfirmationModal: boolean
}

class SellOrderDetailScreen extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            showConfirmationModal: false
        }
    }

    private _renderConfirmationModal = () => {
        if (this.state.showConfirmationModal) {
            return (<BuyOrderConfirmationModal
                showModal={true}
                onRequestCloseCallback={() => {
                    this.setState({ showConfirmationModal: false });
                }} />
            )
        }
    }

    private _renderConfirmButton = () => {
        if (this.state.showConfirmationModal) {

        } else {
            return (
                <View style={[{ alignSelf: 'flex-end' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showConfirmationModal: true })
                        }}>
                        <Text style={[styles.medium_text,
                        {
                            paddingLeft: 80, paddingRight: 80, paddingTop: 10,
                            paddingBottom: 10, textAlign: 'center',
                            backgroundColor: 'blue', color: '#FFFFFF',
                            borderWidth: 1, borderRadius: 20
                        }]}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <TitleTopBarComponent title={"Sell order detail"} />

                {this._renderConfirmationModal()}

                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 10, marginTop: 50 }}>
                        <View style={styles.product_image_container}>
                            <Image
                                source={product_image}
                                style={styles.product_image}
                            />
                        </View>
                        <View style={styles.order_product_container}>
                            <View>
                                <Text style={styles.big_text}>Headphone ASSUR</Text>
                            </View>
                            <View>
                                <Text style={[styles.medium_text, { color: 'gray' }]}>25 $</Text>
                            </View>
                        </View>
                        <View style={styles.order_detail_container}>
                            <View>
                                <Text style={[styles.medium_text,
                                {
                                    paddingLeft: 40, paddingRight: 40, paddingTop: 5, paddingBottom: 5,
                                    borderColor: 'blue', borderWidth: 1, borderRadius: 10
                                }]}>&times; 1</Text>
                            </View>
                            <View>
                                <Text style={styles.big_text}>25 $</Text>
                            </View>
                        </View>
                        <View style={styles.order_product_container}>
                            <View>
                                <Text
                                    style={[styles.medium_text,
                                    { fontWeight: 'bold' }]}>About the product</Text>
                                <Text style={[{ marginTop: 15, color: 'gray' }]}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco labori
                                </Text>
                            </View>
                        </View>
                    </View>


                </ScrollView>
                <View style={styles.bottom_container}>
                    {this._renderConfirmButton()}
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
    product_image_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    product_image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    order_detail_container: {
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    order_product_container: {
        marginTop: 20,
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: 80,
    },
    big_text: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    medium_text: {
        fontSize: 20,
    },
    bottom_container: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        bottom: 10,
        right: 0,
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10

    }
});

export default SellOrderDetailScreen;