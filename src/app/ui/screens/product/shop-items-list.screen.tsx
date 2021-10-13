import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { connect, useSelector } from "react-redux";
import { AppContextInterface } from "../../../app.context";
import ShopProductEntity from "../../../domain/entity/product.entity";
import ShopEntity from "../../../domain/entity/shop.entity";
import DeleteShopProductPresenter, { DeleteShopProductViewModel } from "../../../infrastructure/presenter/delete-shop-product.presenter";
import BackWithTitleTopBarComponent from "../../components/core/back-with-title-top-bar.component";
import MenuWithTitleTopBarComponent from "../../components/core/menu-with-tile-top-bar.component";
import { RootStateType } from "../../store";
import { DELETE_USER_SHOP_PRODUCT, UserShopsProductsActionType } from "../../store/myShop/products/type";

const product_image = require("../../../../assets/img/product/product_main.jpg");

interface IProps {
    context: AppContextInterface,
    navigation: any,
    dispatch: (action: any) => void,
    shops: ShopEntity[],
    shopsProducts: ShopProductEntity[]
}

interface IState {
    filteredhopsProducts: ShopProductEntity[]
    shopSelected: string
}

class ShopItemsListScreen extends React.Component<IProps, IState> {

    private deleteShopProductViewModel: DeleteShopProductViewModel;
    private shopProductToDelete: ShopProductEntity | null;
    private hasDeletedProduct: boolean;

    constructor(props: any) {
        super(props);

        console.log(this.props);

        console.log("\n\n", this.props.shops)

        //const state = useSelector(state => state.)
        this.state = {
            filteredhopsProducts: this.props.shopsProducts,
            shopSelected: 'all'
        };

        this.shopProductToDelete = null;
        this.hasDeletedProduct = false;

        this.deleteShopProductViewModel = {
            setErrorValue: (error) => {
                if (error == null) {
                    //Success delete
                    this.hasDeletedProduct = true;

                    if (this.shopProductToDelete != null) {
                        let action: UserShopsProductsActionType = {
                            type: DELETE_USER_SHOP_PRODUCT,
                            payload: this.shopProductToDelete
                        }

                        if (this.props.dispatch != null) {
                            this.props.dispatch(action);
                        }
                    } else {
                        console.log("Shop to delete is null ? " + this.shopProductToDelete == null);
                    }


                }
            }
        }
    }

    componentDidMount() {
        console.log(this.state);
    }

    componentDidUpdate() {
        const s = this.state.shopSelected;
        if (this.hasDeletedProduct == true) {
            this.hasDeletedProduct = false;
            this.setState({
                filteredhopsProducts: this.props.shopsProducts,
                shopSelected: s
            });
        }
    }

    private _handleFilterChangle = (itemValue: string) => {
        console.log(itemValue);

        if (itemValue == 'all') {
            this.setState({
                filteredhopsProducts: this.props.shopsProducts,
                shopSelected: 'all'
            });
        } else {
            this.setState({
                filteredhopsProducts: this.props.shopsProducts.filter(sp => sp.getShopId() == itemValue),
                shopSelected: itemValue
            });
        }
    }

    private _handleUpdateProductClick = (p: ShopProductEntity) => {
        if (this.props.navigation != undefined) {
            this.shopProductToDelete = p;
            this.props.navigation.navigate(
                "Shop-Product-Update-Screen",
                {
                    product: p
                }
            );
        }
    }

    private _handleDeleteProductClick = (p: ShopProductEntity) => {
        if (this.props.context != undefined) {
            this.props.context.appContainer.controllerFactory
                .getShopProductController()
                .deleteShopProduct(
                    {
                        product: p,
                        shop: this.props.shops.filter((s) => s.getId() === p.getShopId())[0],
                    },
                    new DeleteShopProductPresenter(this.deleteShopProductViewModel)
                )
        }
    }

    private _renderProducts = () => {
        //this.state.filteredhopsProducts.length > 0
        if (true) {
            return this.state.filteredhopsProducts.map(
                (item) => {

                    const shop = this.props.shops.find(s => s.getId() == item.getShopId())

                    return (
                        <View key={"" + item.getId()} style={styles.product_container}>
                            <View style={styles.product_image_container}>
                                <Image
                                    source={product_image}
                                    style={styles.product_image}
                                />
                            </View>
                            <View style={styles.product_container_details}>
                                <Text style={styles.product_price}>{shop != undefined ? shop.getName() : ''}</Text>
                                <Text style={[styles.product_price, { marginTop: 20 }]}>{item.getPrice()}$</Text>
                                <Text style={styles.product_name}>{item.getName()}</Text>
                                <Text style={styles.product_description} >{item.getDescription()}</Text>

                                <View style={{ display: 'flex', flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => {
                                        this._handleUpdateProductClick(item);
                                    }}>
                                        <Text style={[styles.product_remove_btn, { backgroundColor: "blue" }]}>&times; Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this._handleDeleteProductClick(item);
                                    }}>
                                        <Text style={styles.product_remove_btn}>&times; Remove</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )
                }
            )
        } else {
            return (
                <Text style={{ marginTop: 20 }}>No Product</Text>
            )
        }
    }

    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }

    private _renderShopChoices = () => {

        const res = [<Picker.Item key="all" label={"All"} value={'all'} />];

        return res.concat(this.props.shops.map(
            (shop) => <Picker.Item key={shop.getId()} label={shop.getName()} value={shop.getId()} />
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuWithTitleTopBarComponent title={"Shop Products"} toggler={this._toggleDrawerNavigation} />
                <View style={styles.data_container}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <View style={[{
                            paddingBottom: 10
                        }]}>

                            <Text style={{ marginTop: 10 }}>Choose Shop</Text>
                            <Picker
                                selectedValue={this.state.shopSelected}
                                onValueChange={this._handleFilterChangle}>
                                {
                                    this._renderShopChoices()
                                }
                            </Picker>


                            {this._renderProducts()}
                        </View>
                    </ScrollView>

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
    data_container: {
        padding: 10,
        paddingBottom: 50
    },
    product_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    },
    product_image_container: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    product_image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    product_container_details: {
        marginTop: 20,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        maxWidth: 200
    },
    product_price: {
        fontWeight: 'bold',
        fontSize: 15
    },
    product_name: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    product_description: {
        marginTop: 10,
        color: 'gray',
        fontSize: 12
    },
    product_remove_btn: {
        marginTop: 15,
        backgroundColor: 'red',
        color: "#FFFFFF",
        textAlign: 'center',
        borderRadius: 20,
        width: 100,
        padding: 7,
        fontWeight: 'bold'
    }
});

const mapsStateToProps = (state: RootStateType) => {
    return { ...state.userShopReducer, ...state.userShopsProductsReducer };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: any) => { dispatch(action); }
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(ShopItemsListScreen);