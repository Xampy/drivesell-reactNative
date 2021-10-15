import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const user_icon = require("../../../../assets/img/user_icon.png");

const product_main_image = require("../../../../assets/img/product/product_main.jpg");
const product_sub_1_image = require("../../../../assets/img/product/product_sub_1.jpg");
const product_sub_2_image = require("../../../../assets/img/product/product_sub_2.jpg");
const product_sub_3_image = require("../../../../assets/img/product/product_sub_3.jpg");


interface IProps {
    updateImageCallback?: Function,
    mainImageUri: any | null,
    sub1ImageUri: any | null,
    sub2ImageUri: any | null,
    sub3ImageUri: any | null,

    handleClick?: Function
}

interface IState {

}

class ProductImagesComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }


    private _handleClickOnImage = (uri: any) => {
        if (this.props.handleClick != null && this.props.handleClick != undefined) {
            this.props.handleClick(uri);
        }
    }

    private _renderImage = (val: null | any, type: "main" | "sub") => {
        if (val == null) {
            return (
                <Image
                    source={ type == "main" ? product_main_image : product_sub_1_image}
                    style={ type == "main" ? styles.product_main_image : styles.product_sub_image}
                />
            );
        }else{
            if(typeof val == 'string'){
                return (
                    <Image
                        source={{uri: val}}
                        style={type == "main" ? styles.product_main_image : styles.product_sub_image}
                    />
                );
            }
            return (
                <Image
                    source={val}
                    style={ type == "main" ? styles.product_main_image : styles.product_sub_image }
                />
            );
        }

    }
    render() {
        return (
            <View style={styles.bottom_images_container} >

                <View style={styles.images_container}>
                    <View style={styles.main_image_container} >
                        <TouchableOpacity onPress={() => { this._handleClickOnImage(this.props.mainImageUri) }}>
                            {
                                this._renderImage(this.props.mainImageUri, "main")
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sub_images_container} >
                        <View style={styles.sub_image_container}>
                            <TouchableOpacity onPress={() => { this._handleClickOnImage(this.props.sub1ImageUri) }}>
                            {
                                this._renderImage(this.props.sub1ImageUri, "sub")
                            }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sub_image_container}>
                            <TouchableOpacity onPress={() => { this._handleClickOnImage(this.props.sub2ImageUri) }}>
                            {
                                this._renderImage(this.props.sub2ImageUri, "sub")
                            }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sub_image_container}>
                            <TouchableOpacity onPress={() => { this._handleClickOnImage(this.props.sub3ImageUri) }}>
                            {
                                this._renderImage(this.props.sub3ImageUri, "sub")
                            }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.extraContainer}>
                    <View style={styles.availavility_container}>
                        <Text style={styles.available_text}></Text>
                    </View>
                </View>

            </View>

        )
    }
}


const styles = StyleSheet.create({


    images_container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 5,
        height: 230,
    },

    bottom_images_container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 15,
        flex: 5,

    },

    main_image_container: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10
    },
    sub_images_container: {
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: 1
    },

    sub_image_container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5
    },


    product_main_image: {
        width: 210,
        height: 210,
        resizeMode: 'contain'
    },

    product_sub_image: {
        width: 50,
        height: 50
    },





    extraContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    availavility_container: {

    },
    available_text: {

    }
});

export default ProductImagesComponent;