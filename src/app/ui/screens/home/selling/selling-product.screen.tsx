import * as React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import DefaultTopBarComponent from '../../../components/core/default-top-bar.component';
import ProductComponent from '../../../components/product/product.component';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFALT_LIST_DATA } from '../../../../../assets/data/default-list';
import AppContext, { AppContextInterface } from '../../../../app.context';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../../location.tools';
import GetLocalShopsProductsPresenter, { GetLocalShopsProductsViewModel } from '../../../../infrastructure/presenter/get-local-shops-products.presenter';
import ShopProductEntity from '../../../../domain/entity/product.entity';
import ShopEntity from '../../../../domain/entity/shop.entity';

interface IProps {
    navigation: any,
    router: any
}

interface IState {
    shopsProductsFiltered: ShopProductEntity[];
}

class SellingProductScreen extends React.Component<IProps, IState> {

    static contextType = AppContext;
    private hasLocationPermission: Promise<boolean | null> | null;

    private getLocalShopsProductsViewModel: GetLocalShopsProductsViewModel;
    private shops: ShopEntity[];
    private shopsProducts: ShopProductEntity[];


    constructor(props: any) {
        super(props);

        console.log(this.context);

        this.state = {
            shopsProductsFiltered: []
        }

        this.hasLocationPermission = null;
        this.shops = [];
        this.shopsProducts = [];


        this.getLocalShopsProductsViewModel = {
            setDataValue: (shops: ShopEntity[] | null, products: ShopProductEntity[] | null) => {
                if (shops != null && products != null) {
                    this.shops = shops;
                    this.shopsProducts = products;

                    this.setState({shopsProductsFiltered: [...this.shopsProducts]});
                }
            }
        }
    }

    componentDidMount() {
        this.hasLocationPermission = requestLocationPermission();
        console.log(this.context);


        this.hasLocationPermission.then(
            (val) => {
                if (val == true){
                    this._getLocalShopsProducts()
                }
            }
        )

    }

    componentDidUpdate(){
        console.log("Component do update");
    }

    private _getLocalShopsProducts = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);

                if (this.context != undefined) {
                    (this.context as AppContextInterface).appContainer.controllerFactory
                        .getUserController()
                        .getLocalShops(
                            {
                                city: "Lome",
                                provinceOrRegion: "Maritime",
                                country: "Togo",

                                latitude: `${position.coords.latitude}`,
                                longitude: `${position.coords.longitude}`
                            },
                            new GetLocalShopsProductsPresenter(this.getLocalShopsProductsViewModel)
                        );
                }

            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    private _handleImageClick = (imageUri: any) => {
        console.log("Clicked on image in selling product");
        console.log(imageUri);
    }

    private _handleTopClick = () => {
        console.log('Cliked on top');

        this.props.navigation.navigate(
            "Selling-Product-Detail-Screen", {
            product: 12 //Put product data here
        }
        )
    }

    private _handleDiscussionClick = () => {
        console.log("Clicked discussion");
    }

    private _renderProduct = ({ item }: any ) => {
        console.log(item);

        const shop = this.shops.find(s => s.getId() == (item as ShopProductEntity).getShopId());
        if(shop != undefined)
            return (
                <ProductComponent
                    product={item}
                    shop={shop}
                    handleDiscussionClick={this._handleDiscussionClick}
                    handleImageClick={this._handleImageClick}
                    handleTopClick={this._handleTopClick}>
                </ProductComponent>
            )
        return <View></View>
    }

    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }

    private _filterProductsByName = (val: string) => {
        console.log("Filtering by name : ", val);
        console.log(this.shopsProducts.filter(
            p => p.getName().includes(val)));
            
        this.setState(
            {
                shopsProductsFiltered: val.length > 0 ? this.shopsProducts.filter(
                    p => p.getName().includes(val)) : this.shopsProducts
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <DefaultTopBarComponent filterProductsByNameHandler={this._filterProductsByName} toggler={this._toggleDrawerNavigation} ></DefaultTopBarComponent>

                    <FlatList
                        style={{ padding: 10 }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.shopsProductsFiltered}
                        renderItem={this._renderProduct}
                        keyExtractor={(item) => item.getId().toString()}
                    />
                </KeyboardAvoidingView>


            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    }
});


export default SellingProductScreen;