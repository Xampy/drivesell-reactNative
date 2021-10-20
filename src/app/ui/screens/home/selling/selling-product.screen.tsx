import * as React from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import DefaultTopBarComponent from '../../../components/core/default-top-bar.component';
import ProductComponent from '../../../components/product/product.component';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DEFALT_LIST_DATA } from '../../../../../assets/data/default-list';
import AppContext, { AppContextInterface } from '../../../../app.context';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../../location.tools';
import GetLocalShopsProductsPresenter, { GetLocalShopsProductsViewModel } from '../../../../infrastructure/presenter/get-local-shops-products.presenter';
import ShopProductEntity from '../../../../domain/entity/product.entity';
import ShopEntity from '../../../../domain/entity/shop.entity';
import LocationChangeModalComponent from '../../../components/core/location-change-modal.component';

interface IProps {
    navigation: any,
    router: any
}

interface IState {
    shopsProductsFiltered: ShopProductEntity[],
    showLocationChangeModal: boolean
}

class SellingProductScreen extends React.Component<IProps, IState> {

    static contextType = AppContext;
    private hasLocationPermission: Promise<boolean | null> | null;

    private getLocalShopsProductsViewModel: GetLocalShopsProductsViewModel;
    private shops: ShopEntity[];
    private shopsProducts: ShopProductEntity[];
    private city: string;
    private country: string;
    private provinceOrRegion: string;


    constructor(props: any) {
        super(props);

        console.log("In constructor");
        console.log(this.context);

        this.state = {
            shopsProductsFiltered: [],
            showLocationChangeModal: false
        }

        this.hasLocationPermission = null;
        this.shops = [];
        this.shopsProducts = [];

        this.city = "";  //Pass this values as props to the component
        this.country = "";
        this.provinceOrRegion = "";


        this.getLocalShopsProductsViewModel = {
            setDataValue: (shops: ShopEntity[] | null, products: ShopProductEntity[] | null) => {
                if (shops != null && products != null) {
                    this.shops = shops;
                    this.shopsProducts = products;

                    this.setState({ shopsProductsFiltered: [...this.shopsProducts] });
                }
            }
        }
    }

    componentDidMount() {
        this.hasLocationPermission = requestLocationPermission();
        console.log(this.context);


        this.hasLocationPermission.then(
            (val) => {
                if (val == true) {
                    //Check the country city and province vale to be not null or empty string
                    //To be done when finished
                    this._getLocalShopsProducts()
                }
            }
        ).catch(
            (error) => {
                console.error(error);
            }
        )

        setTimeout(() => {
            this.city = (this.context as AppContextInterface).appContainer.loginContainer.currentCity;
            this.provinceOrRegion = (this.context as AppContextInterface).appContainer.loginContainer.currentProvinceOrRegion;
            this.country = (this.context as AppContextInterface).appContainer.loginContainer.currentCountry;

            //this.setState({});
        }, 3000);

    }

    componentDidUpdate() {
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
                                city: this.city.length > 0 ? this.city : "Lome",
                                provinceOrRegion: this.provinceOrRegion.length > 0 ? this.provinceOrRegion : "Maritime",
                                country: this.country.length > 0 ? this.country : "Togo",

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

    private _handleImageClick = (shop: ShopEntity, product: ShopProductEntity) => {
        console.log("Clicked on image in selling product");

        this.props.navigation.navigate(
            "Selling-Product-Detail-Screen",
            {
                product: product,
                shop: shop
            }
        )
    }

    private _handleTopClick = (shop: ShopEntity, product: ShopProductEntity) => {
        console.log('Cliked on top');

        this.props.navigation.navigate(
            "Selling-Product-Detail-Screen",
            {
                product: product,
                shop: shop
            }
        )
    }

    private _handleDiscussionClick = () => {
        console.log("Clicked discussion");
    }

    private _renderProduct = (item: ShopProductEntity) => {
        console.log(item);

        const shop = this.shops.find(s => s.getId() == (item as ShopProductEntity).getShopId());
        if (shop != undefined)
            return (
                <ProductComponent key={"product_" + item.getId()}
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

    private _renderNoProductsMessage = () => {
        if (this.state.shopsProductsFiltered.length == 0) {
            return <Text style={{ fontSize: 15, padding: 10 }}>No results</Text>
        }
    }

    private _handleLocationChange = (changes: { city: string, provinceOrRegion: string, country: string }) => {
        this.country = changes.country;
        this.city = changes.city;
        this.provinceOrRegion = changes.provinceOrRegion;

        console.log("\n\n\nChanging location");
        console.log([this.country, this.city, this.provinceOrRegion]);
        console.log([this.country, this.city, this.provinceOrRegion]);

        this.setState({ showLocationChangeModal: false });

        //Fetch products
    }

    private _handleLocationClick = () => {
        console.log("Want to show the modal");
        this.setState({ showLocationChangeModal: true });
    }

    private _renderLocationChangeModal = () => {
        if (this.state.showLocationChangeModal)
            return (
                <LocationChangeModalComponent
                    city={this.city}
                    provinceOrRegion={this.provinceOrRegion}
                    country={this.country}
                    onRequestCloseCallback={this._handleLocationChange}
                    showModal={true} />
            )
    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <DefaultTopBarComponent
                        filterProductsByNameHandler={this._filterProductsByName}
                        locationClick={this._handleLocationClick}
                        toggler={this._toggleDrawerNavigation} ></DefaultTopBarComponent>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        style={{marginBottom: 10, paddingLeft: 10, paddingEnd: 10}}>
                        {
                            this.state.shopsProductsFiltered.map(
                                (product) => {
                                    return this._renderProduct(product)
                                }
                            )
                        }
                        {
                            this._renderNoProductsMessage()
                        }
                    </ScrollView>
                    {this._renderLocationChangeModal()}
                </KeyboardAvoidingView>


            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingBottom: 50
    }
});


export default SellingProductScreen;