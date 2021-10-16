import * as React from 'react';
import { Picker } from '@react-native-picker/picker';
import {
    Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View
} from 'react-native';
import Dialog from "react-native-dialog";
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import ProductImagesComponent from '../components/product/product-images.component';
import { RootStateType } from '../store';
import { connect } from 'react-redux';
import MenuWithTitleTopBarComponent from '../components/core/menu-with-tile-top-bar.component';
import ShopEntity from '../../domain/entity/shop.entity';
import ShopProductEntity from '../../domain/entity/product.entity';
import { AppContextInterface } from '../../app.context';
import NewUserShopProductCreatePresenter, { NewShopProductViewModel } from '../../infrastructure/presenter/new-user-shop-product-create.presenter';
import { ADD_USER_SHOP_PRODUCT, UserShopsProductsActionType } from '../store/myShop/products/type';
import RNFetchBlob from 'react-native-fetch-blob';
import { requestStoragePermission } from '../../share/storage.tools';



const user_icon = require('../../../assets/img/user_icon.png');




interface IProps {
    context: AppContextInterface;
    navigation: any,
    shops: ShopEntity[],
    dispatch: (action: UserShopsProductsActionType) => void
}

interface IState {
    main_image_filename: string,
    sub_1_image_filename: string,
    sub_2_image_filename: string,
    sub_3_image_filename: string,
    main_image_uri: any | null,
    sub_1_image_uri: any | null,
    sub_2_image_uri: any | null,
    sub_3_image_uri: any | null,


    product_name: string,
    product_price: number,
    product_reduction: number,
    product_description: string,

    product_details: string[],
    product_shipping_way: string[],


    openEditor: boolean,
    showSuccessDialog: boolean,
    selectedShop: string
}

class NewProductScreen extends React.Component<IProps, IState> {

    private productName: string;
    private productPrice: number;
    private productReduction: number;
    private productDescription: string;

    private newProductDetailText: string;
    private newProductShippingDetailText: string;
    private shopProduct: ShopProductEntity;
    private createShopProductViewModel: NewShopProductViewModel;

    private mainImageFilePath: null | string;
    private sub1ImageFilePath: null | string;
    private sub2ImageFilePath: null | string;
    private sub3ImageFilePath: null | string;
    hasStoragePermission: Promise<boolean | null> | null;


    constructor(props: any) {
        super(props);


        this.state = {
            main_image_filename: 'filename',
            sub_1_image_filename: 'filename',
            sub_2_image_filename: 'filename',
            sub_3_image_filename: 'filename',
            main_image_uri: null,
            sub_1_image_uri: null,
            sub_2_image_uri: null,
            sub_3_image_uri: null,

            //Product informations
            product_name: "Product Name",
            product_price: 0,
            product_reduction: 0,
            product_description: "Lorem ipsum",


            product_details: ["Color blue"],
            product_shipping_way: ["Cash on delivery"],

            openEditor: false,
            showSuccessDialog: false,
            selectedShop: 'default'
        };

        this.hasStoragePermission = null;

        this.mainImageFilePath = null;
        this.sub1ImageFilePath = null;
        this.sub2ImageFilePath = null;
        this.sub3ImageFilePath = null;



        this.productName = "";
        this.productPrice = 0;
        this.productReduction = 0;
        this.productDescription = "";
        this.newProductDetailText = "";
        this.newProductShippingDetailText = "";

        this.shopProduct = new ShopProductEntity("", 0, 0, "");

        this.createShopProductViewModel = {
            setShopProductValue: (shopProduct: ShopProductEntity | null) => {
                console.log("\n\n\nCreated shop product");
                console.log(shopProduct);

                if (shopProduct != null) {
                    let action: UserShopsProductsActionType = {
                        type: ADD_USER_SHOP_PRODUCT,
                        payload: shopProduct
                    }

                    if (this.props.dispatch != null) {
                        this.props.dispatch(action);
                    }

                    //Close the editor
                    this._setEditorVisibility(false);
                    this.setState({ showSuccessDialog: true });
                }
            }
        }
    }

    componentDidMount() {
        this.hasStoragePermission = requestStoragePermission();
    }



    private _renderDialog = () => {

        return (
            <Dialog.Container visible={this.state.showSuccessDialog}>
                <Dialog.Title>{this.state.product_name}</Dialog.Title>
                <Dialog.Description>
                    Product saved....
                </Dialog.Description>
                <Dialog.Button label="Continue" onPress={
                    () => {
                        this.setState({ showSuccessDialog: false });
                        if (this.props.navigation != undefined) {
                            this.props.navigation.navigate("My Products");
                        }
                    }} />
            </Dialog.Container>
        );
    }
    private _renderEditProductBtn = () => {
        if (true) {
            return (
                <TouchableOpacity
                    style={styles.bottom_float_buy_action_container}
                    onPress={() => { this._setEditorVisibility(true) }}>
                    <View style={styles.buy_text_container}>
                        <Text style={styles.buy_text} >Edit Product</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }



    _renderProduct = ({ item }: any) => {
        console.log(item);
        return <ProductImagesComponent
            mainImageUri={item.getMainImage().length > 0 ? item.getMainImage() : null}
            sub1ImageUri={item.getSubOneImage().length > 0 ? item.getSubOneImage() : null}
            sub2ImageUri={item.getSubTwoImage().length > 0 ? item.getSubTwoImage() : null}
            sub3ImageUri={item.getSubThreeImage().length > 0 ? item.getSubThreeImage() : null} />
    }

    _renderOrderModal = () => {

    }

    private _renderImages = () => {
        return (
            <View>
                <ProductImagesComponent
                    mainImageUri={this.state.main_image_uri}
                    sub1ImageUri={this.state.sub_1_image_uri}
                    sub2ImageUri={this.state.sub_2_image_uri}
                    sub3ImageUri={this.state.sub_3_image_uri}
                />
            </View>
        )
    }

    /**
     * Render description rows
     * -- Need to have parameter or use the state --
     * @returns 
     */
    private _renderDescriptionRows = () => {
        return this.state.product_shipping_way.map(
            (data, index) => {
                return (
                    <View key={"ship" + index} style={{ display: 'flex', flexDirection: 'row', marginTop: 9 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray' }} >{'\u2022'}</Text>
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={{ fontSize: 15, color: 'gray' }} >{data}</Text>
                        </View>
                    </View>
                )
            }
        )
    }

    private _renderProductDetailRows = () => {
        return this.state.product_details.map(
            (data, index) => {
                return (
                    <View key={"det" + index} style={{ display: 'flex', flexDirection: 'row', marginTop: 9 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray' }} >{'\u2022'}</Text>
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={{ fontSize: 15, color: 'gray' }} >{data}</Text>
                        </View>
                    </View>
                )
            }
        )
    }


    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }



    private _uploadFiles = async (callback: Function) => {
        if (this.hasStoragePermission != null) {
            try {
                if (this.props.context != undefined) {
                    const paths = [
                        this.mainImageFilePath, this.sub1ImageFilePath,
                        this.sub2ImageFilePath, this.sub3ImageFilePath
                    ];


                    for (let index = 0; index < paths.length; index++) {
                        const path = paths[index];

                        let filename = "";
                        switch (index) {
                            case 0: filename = this.state.main_image_filename; break;
                            case 1: filename = this.state.sub_1_image_filename; break;
                            case 2: filename = this.state.sub_2_image_filename; break;
                            case 3: filename = this.state.sub_3_image_filename; break;
                        }

                        if (path != null) {

                            const url = await this.props.context.appContainer.storageFactory
                                .getFirebaseStorage()
                                .uploadFile(
                                    "products",
                                    this.props.context.appContainer.loginContainer.userId + "_" + filename,
                                    path
                                );

                            if (url != undefined) {
                                switch (index) {
                                    case 0: this.shopProduct.setMainImage(url); break;
                                    case 1: this.shopProduct.setSubOneImage(url); break;
                                    case 2: this.shopProduct.setSubTwoImage(url); break;
                                    case 3: this.shopProduct.setSubThreeImage(url); break;
                                }
                            }
                        } else {
                            //Nothing to do
                        }

                    }//[END] Uploading images files


                    //Move to next
                    callback();
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            this.hasStoragePermission = requestStoragePermission();
        }

    }

    private _publishProduct = () => {
        console.log("\n\n\nPushing producct....");
        this._setEditorVisibility(false);
        this.shopProduct.setName(this.state.product_name);
        this.shopProduct.setName(this.productName);
        this.shopProduct.setDescription(this.state.product_description);
        this.shopProduct.setDescription(this.productDescription);
        this.shopProduct.setPrice(this.state.product_price);
        this.shopProduct.setPrice(this.productPrice);
        this.shopProduct.setReduction(this.state.product_reduction);

        this.shopProduct.setDetails(this.state.product_details);
        this.shopProduct.setShippings(this.state.product_shipping_way);

        console.log(this.shopProduct);

        this._uploadFiles(
            () => {
                //Validate condition
                console.log("Shops list ", this.props.shops)
                if (this.props.context != undefined) {
                    this.props.context.appContainer.controllerFactory
                        .getShopProductController()
                        .createShopProduct(
                            {
                                product: this.shopProduct,
                                shop: this.props.shops.filter((s) => s.getId() === this.shopProduct.getShopId())[0]
                            },
                            new NewUserShopProductCreatePresenter(this.createShopProductViewModel)
                        )
                }
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderDialog()}

                <MenuWithTitleTopBarComponent toggler={this._toggleDrawerNavigation} title={"New Product"} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingBottom: 100 }}
                >
                    <View style={styles.data_container} >

                        <View style={styles.user_container} >
                            <View style={styles.user_image_container}>
                                <Image
                                    source={user_icon}
                                    style={styles.user_icon}
                                />
                            </View>
                            <View style={styles.user_informations_container}>
                                <View style={styles.user_data_container}>
                                    <Text style={styles.username}>Xampy</Text>
                                    <Text style={styles.user_profil}>@see more</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Octicons name={"comment-discussion"} size={30} />
                                </View>
                            </View>
                        </View>

                        {this._renderImages()}

                        <View style={styles.product_description_container}>

                            <View style={styles.product_top_description_container}>
                                <View style={styles.product_name_container}>
                                    <Text style={styles.product_name}>{this.state.product_name}</Text>
                                    <Text style={{ color: 'gray', fontSize: 12 }}>Shop: DonChen Chi</Text>
                                </View>
                                <View style={styles.product_price_container}>
                                    <Text style={styles.product_price_old}>{this.state.product_reduction > 0 ? this.state.product_reduction + '$' : ""}</Text>
                                    <Text style={styles.product_price}>{this.state.product_price} $</Text>
                                </View>
                            </View>

                            <View style={styles.product_description_text_container}>
                                <Text style={styles.section_header_title} >DESCRIPTION</Text>

                                <Text style={styles.description_text} >
                                    {this.state.product_description}
                                </Text>

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

                {this._renderEditProductBtn()}

                {this._renderEditor()}

            </View>
        )
    }

    private _getImageFile = async (name: string) => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });

            const path = (await RNFetchBlob.fs.stat(res.uri)).path;

            console.log(JSON.stringify(res));
            if (name == "main_image") {
                this.mainImageFilePath = "" + path;
                this.setState({
                    main_image_filename: res.name,
                    main_image_uri: res.uri
                })
            } else if (name == "sub_1_image") {
                this.sub1ImageFilePath = "" + path;
                this.setState({
                    sub_1_image_filename: res.name,
                    sub_1_image_uri: res.uri
                })
            } else if (name == "sub_2_image") {
                this.sub2ImageFilePath = "" + path;

                this.setState({
                    sub_2_image_filename: res.name,
                    sub_2_image_uri: res.uri
                })
            } else if (name == "sub_3_image") {
                this.sub3ImageFilePath = "" + path;
                this.setState({
                    sub_3_image_filename: res.name,
                    sub_3_image_uri: res.uri
                })
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err as any)) {

            } else {
                //
            }
        }
    }


    private _renderEditorProductsDetail = () => {
        return this.state.product_details.map(
            (item, index) => {
                return (
                    <View key={"product_detail_" + index} style={{ marginTop: 10 }}>
                        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text key={"product_detail" + index} >{item}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const details = Array.from(this.state.product_details);
                                    this.setState({
                                        product_details: details.filter(
                                            (value) => item != value
                                        )
                                    });
                                }}>
                                <AntDesign
                                    name={"closecircle"}
                                    color={'red'}
                                    size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        )
    }


    private _renderEditorProductsShippingDetail = () => {
        return this.state.product_shipping_way.map(
            (item, index) => {
                return (
                    <View key={"product_shipping_" + index} style={{ marginTop: 10 }}>
                        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text key={"product_shipping" + index} >{item}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const details = Array.from(this.state.product_shipping_way);
                                    this.setState({
                                        product_shipping_way: details.filter(
                                            (value) => item != value
                                        )
                                    });
                                }}>
                                <AntDesign
                                    name={"closecircle"}
                                    color={'red'}
                                    size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        )
    }


    private _setEditorVisibility = (visibile: boolean) => {

        console.log(
            [this.productName,
            this.productPrice,
            this.productReduction,
            this.productDescription]
        )
        this.setState(
            {
                product_name: this.productName,
                product_price: this.productPrice,
                product_reduction: this.productReduction,
                product_description: this.productDescription,
                openEditor: visibile
            }
        );

        console.log(this.state);
    }

    private _renderEditor = () => {
        if (this.state.openEditor) {
            return (
                <KeyboardAvoidingView
                    style={styles.edit_panel_container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={[{ marginTop: 60 }]}>
                            <View style={{
                                marginBottom: 20, display: 'flex',
                                flexDirection: 'row', justifyContent: 'flex-end'
                            }}>

                                <TouchableOpacity
                                    onPress={() => {

                                        this._setEditorVisibility(false);
                                    }}>
                                    <Text style={
                                        {
                                            color: 'gray', padding: 5, borderColor: 'gray',
                                            borderWidth: 1, borderRadius: 10
                                        }}>Close</Text>
                                </TouchableOpacity>

                            </View>

                            <View>
                                <Text style={styles.editor_section_header}>Shop</Text>
                            </View>

                            <View style={styles.editor_section_container}>
                                <Picker
                                    selectedValue={this.state.selectedShop}
                                    onValueChange={(itemValue: string) => {
                                        console.log(itemValue);
                                        this.shopProduct.setShopId(itemValue);

                                        this.setState({ selectedShop: itemValue });
                                    }}>
                                    <Picker.Item key={"default_shop_iii"} label={"choose..."} value={"default"} />
                                    {
                                        this.props.shops.map(
                                            (shop) => <Picker.Item key={shop.getId()} label={shop.getName()} value={shop.getId()} />
                                        )
                                    }
                                </Picker>
                            </View>



                            <View>
                                <Text style={styles.editor_section_header}>Product Informations</Text>
                            </View>

                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Name</Text>
                                <TextInput
                                    defaultValue={this.state.product_name}
                                    onChangeText={(text) => { this.productName = "" + text }}
                                />
                            </View>
                            <View style={styles.editor_section_container}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.editor_section_title}>Price (USD)</Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            defaultValue={"" + this.state.product_price}
                                            maxLength={7}
                                            onChangeText={
                                                (text) => {
                                                    this.productPrice = parseInt(text.replace(/[^0-9]/g, ''));
                                                }
                                            }
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.editor_section_title}>Reduction (%)</Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            defaultValue={"" + this.state.product_reduction}
                                            maxLength={2}
                                            onChangeText={
                                                (text) => {
                                                    this.productReduction = parseInt(text.replace(/[^0-9]/g, ''));
                                                }
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Description</Text>
                                <TextInput
                                    multiline={true}
                                    defaultValue={this.state.product_description}
                                    onChangeText={(text) => { this.productDescription = "" + text }}
                                />
                            </View>

                            <View>
                                <Text style={styles.editor_section_header}>Product Images</Text>
                            </View>

                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Main</Text>

                                <View style={styles.editor_image_chooser_container}>
                                    <Text>{this.state.main_image_filename}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._getImageFile("main_image");
                                        }}>
                                        <Text style={styles.editor_image_chooser_btn} >change</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Sub 1</Text>
                                <View style={styles.editor_image_chooser_container}>
                                    <Text>{this.state.sub_1_image_filename}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._getImageFile("sub_1_image");
                                        }}>
                                        <Text style={styles.editor_image_chooser_btn} >change</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Sub 2</Text>
                                <View style={styles.editor_image_chooser_container}>
                                    <Text>{this.state.sub_2_image_filename}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._getImageFile("sub_2_image");
                                        }}>
                                        <Text style={styles.editor_image_chooser_btn} >change</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Sub 3</Text>
                                <View style={styles.editor_image_chooser_container}>
                                    <Text>{this.state.sub_3_image_filename}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._getImageFile("sub_3_image");
                                        }}>
                                        <Text style={styles.editor_image_chooser_btn} >change</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View>
                                <Text style={styles.editor_section_header}>Product Detail</Text>
                            </View>

                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Detail</Text>
                                <View style={styles.editor_shipping_chooser_container}>
                                    <View style={{ flex: 4 }}>
                                        <TextInput
                                            onChangeText={(text) => {
                                                this.newProductDetailText = text;
                                            }}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {

                                            if (this.newProductDetailText.length > 1) {
                                                const details = Array.from(this.state.product_details);
                                                this.setState({
                                                    product_details: [...details, this.newProductDetailText]
                                                });
                                            }
                                        }}>
                                        <Text style={styles.editor_shipping_chooser_btn} >+ add</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    {this._renderEditorProductsDetail()}
                                </View>

                            </View>


                            <View>
                                <Text style={styles.editor_section_header}>Product Shipping Detail</Text>
                            </View>

                            <View style={styles.editor_section_container}>
                                <Text style={styles.editor_section_title}>Shipping</Text>
                                <View style={styles.editor_shipping_chooser_container}>
                                    <View style={{ flex: 4 }}>
                                        <TextInput
                                            onChangeText={(text) => {
                                                this.newProductShippingDetailText = text;
                                            }}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {

                                            if (this.newProductShippingDetailText.length > 1) {
                                                const details = Array.from(this.state.product_shipping_way);
                                                this.setState({
                                                    product_shipping_way: [...details, this.newProductShippingDetailText]
                                                });
                                            }
                                        }}>
                                        <Text style={styles.editor_shipping_chooser_btn} >+ add</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    {this._renderEditorProductsShippingDetail()}
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 10 }}>
                                    <TouchableOpacity onPress={this._publishProduct}>
                                        <Text style={{
                                            color: '#FFFFFF',
                                            backgroundColor: "blue",
                                            borderRadius: 10,
                                            textAlign: 'center',
                                            paddingTop: 10, paddingBottom: 10

                                        }} >Publish</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
        }
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
        backgroundColor: 'blue',
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
        height: 50
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
        alignItems: 'center'
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
        marginTop: 10
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


    //[START] edit panel container
    edit_panel_container: {
        width: '80%',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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

    editor_image_chooser_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    editor_image_chooser_btn: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        color: "#FFFFFF",
        backgroundColor: 'blue',
        borderRadius: 10
    },

    editor_shipping_chooser_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    editor_shipping_chooser_btn: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        color: "blue",
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10
    },


    editor_shipping_remove_btn: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        color: "blue",
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10
    },
    //[END] edit panel container

});


const mapsStateToProps = (state: RootStateType) => {
    console.log("sdd", state);
    return state.userShopReducer;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: UserShopsProductsActionType) => { dispatch(action); }
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(NewProductScreen);