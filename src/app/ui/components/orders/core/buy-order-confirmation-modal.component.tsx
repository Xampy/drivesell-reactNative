import * as React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';


const qr_code_image = require('../../../../../assets/img/qr-code.png');

interface IProps {
    onRequestCloseCallback: Function,
    showModal: boolean
}

interface IState {
    hasWantToConfirm: boolean
}

class BuyOrderConfirmationModal extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);

        this.state = {
            hasWantToConfirm: this.props.showModal
        }
    }

    private _setConfirmationModalVisibility(visible: boolean){
        this.setState({hasWantToConfirm: visible});
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                presentationStyle={"overFullScreen"}
                statusBarTranslucent={true}
                visible={this.state.hasWantToConfirm}
                onRequestClose={() => {
                    this._setConfirmationModalVisibility(false);
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
                                    marginTop: 20,
                                    width: 300
                                }
                            }>


                                <View>
                                    <Text style={[{textAlign: 'center'}]} >Be sure that you've received you product before 
                                        confim the order or let the seller scan your order 
                                        QR Code.</Text>
                                </View>
                                <Text style={[{textAlign: 'center', color: 'gray', fontSize: 10, marginTop: 20}]}>seller qr code</Text>
                                <View style={styles.qr_code_image_container}>
                                    <Image
                                        source={qr_code_image}
                                        style={styles.qr_code_image}
                                    />
                                    
                                </View>

                                <View style={[{marginTop: 30}]}>
                                <Text style={styles.modal_order_pay_btn} >Confirm</Text>
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
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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

    qr_code_image_container: {
        marginTop: 15,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    qr_code_image: {
        width: 150,
        height: 150
    },


    modal_order_pay_btn: {
        backgroundColor: 'blue',
        color: '#FFFFFF',
        padding: 10,
        textAlign: 'center',
        borderRadius: 15,
    },

   
});


export default BuyOrderConfirmationModal;