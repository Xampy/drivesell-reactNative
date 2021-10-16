import { isProperty } from '@babel/types';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import ShopProductEntity from '../../../domain/entity/product.entity';
import ShopEntity from '../../../domain/entity/shop.entity';
import ProductImagesComponent from './product-images.component';

const user_icon = require("../../../../assets/img/user_icon.png");


interface IProps {
    handleImageClick?: Function,
    handleTopClick?: Function,
    handleDiscussionClick?: Function,

    product: ShopProductEntity,
    shop: ShopEntity
}

interface IState {

}

class ProductComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    private _handleImageClick = (imageUri: any) => {
        console.log("Clicked on image");
        console.log(imageUri);

        if (this.props.handleImageClick != undefined)
            this.props.handleImageClick(imageUri);
    }

    private _handleTopClick = () => {
        console.log('Cliked on top');

        if (this.props.handleTopClick != undefined) {
            this.props.handleTopClick();
        }
    }

    private _handleDiscussionClick = () => {
        console.log("Clicked discussion");

        if (this.props.handleDiscussionClick != undefined) {
            this.props.handleDiscussionClick();
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.top_container}>
                    <View style={styles.top_user_icon_container}>
                        <Image
                            source={ (
                                this.props.shop.getImageUrl() ==  null || 
                                this.props.shop.getImageUrl().length < 1)?  user_icon : this.props.shop.getImageUrl()}
                            style={styles.user_icon}
                        />
                    </View>
                    <View style={styles.description_container}>

                        <TouchableOpacity onPress={() => { this._handleTopClick() }}>
                            <View style={styles.price_name_container}>
                                <View style={styles.price_container}>
                                    <Text style={styles.price_value} >{this.props.product.getPrice()} $</Text>
                                </View>
                                <View style={styles.product_name_container}>
                                    <Text style={styles.product_name_value} >{this.props.product.getName()} </Text>
                                </View>
                            </View>

                            <View style={styles.product_description_container}>
                                <Text>{this.props.product.getDescription()}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.bottom_container}>


                    <View style={styles.user_container}>
                        <Text style={styles.username_value}></Text>

                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity onPress={() => { this._handleDiscussionClick(); }}>
                                <Octicons name={"comment-discussion"} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ProductImagesComponent
                        mainImageUri={(
                            this.props.product != undefined && 
                            this.props.product.getMainImage() != null) ? this.props.product.getMainImage() : null}
                        sub1ImageUri={(
                            this.props.product != undefined && 
                            this.props.product.getSubOneImage() != null) ? this.props.product.getSubOneImage() : null}
                        sub2ImageUri={(
                            this.props.product != undefined && 
                            this.props.product.getSubTwoImage() != null) ? this.props.product.getSubTwoImage() : null}
                        sub3ImageUri={(
                            this.props.product != undefined && 
                            this.props.product.getSubThreeImage() != null) ? this.props.product.getSubThreeImage() : null}
                        handleClick={this._handleImageClick}></ProductImagesComponent>
                </View>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },

    top_container: {
        display: 'flex',
        flexDirection: 'row',
    },

    top_user_icon_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        flex: 1,
    },

    user_icon: {
        width: 50,
        height: 50
    },


    description_container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 15,
        height: 60,
        overflow: 'hidden',
        flex: 5
    },

    price_name_container: {
        display: 'flex',
        flexDirection: 'row'
    },

    price_container: {},
    product_name_container: {
        marginLeft: 10
    },

    product_name_value: {},
    price_value: {
        fontSize: 20,
        fontWeight: 'bold'
    },



    product_description_container: {

    },








    bottom_container: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
    },

    user_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        flex: 1,

    },

    username_value: {

    },


    images_container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 5,
        height: 230
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

export default ProductComponent;