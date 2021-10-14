import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import AppContext, { AppContextInterface } from '../../../app.context';
import ShopEntity from '../../../domain/entity/shop.entity';
import { STORAGE_LATEST_LOCATION_KEY } from '../../../infrastructure/adapter/secondary/storage/local-async.storage';
import GetUserShopsPresenter, { GetUserShopsViewModel } from '../../../infrastructure/presenter/get-user-shops.presenter';
import { ADD_USER_SHOP_PRODUCT, UserShopsProductsActionType } from '../../store/myShop/products/type';
import { ADD_USER_SHOP, UserShopActionType } from '../../store/myShop/type';


interface IProps {
    onLoad: Function,
    navigation: any,
    dispatch?: (action: any) => void
}

interface IState {
    provinceOrRegion: string,
    country: string,
    city: string,

    chooseLocation: boolean
}

class SplashScreen extends React.Component<IProps, IState> {

    static contextType = AppContext;

    private shopProvinceOrRegion: string;
    private shopCountry: string;
    private shopCity: string;

    private getUserShopsViewModel: GetUserShopsViewModel;

    constructor(props: any) {
        super(props);


        this.shopProvinceOrRegion = "Maritime"
        this.shopCountry = "Togo";
        this.shopCity = "Lome";

        this.state = {
            provinceOrRegion: this.shopProvinceOrRegion,
            country: this.shopCountry,
            city: this.shopCity,
            chooseLocation: false
        }

        this.getUserShopsViewModel = {
            setDataValue: async (shops, products) => {
                console.log(shops);

                await new Promise<void>(
                    (resolve, reject) => {
                        shops?.forEach(
                            (shop) => {
                                let payload: ShopEntity = shop; //clone shop object
                                let action: UserShopActionType = {
                                    type: ADD_USER_SHOP,
                                    payload: payload
                                }
                                if (this.props.dispatch != undefined) {
                                    this.props.dispatch(action);
                                }
                            }
                        )

                        resolve();
                    }
                );

                await new Promise<void>(
                    (resolve, reject) => {
                        products?.forEach(
                            (product) => {
                                let action: UserShopsProductsActionType = {
                                    type: ADD_USER_SHOP_PRODUCT,
                                    payload: product
                                }
            
                                if (this.props.dispatch != null) {
                                    this.props.dispatch(action);
                                }
                            }
                        )

                        resolve();
                    }
                );


                setTimeout(() => {
                    console.log("Content loaded");

                    if (this.props.navigation != undefined) {
                        this.props.navigation.navigate(
                            "Main-Screen"
                        )
                    }
                }, 2000);
            }
        }

    }

    componentDidMount() {
        console.log("In splash screen");
        console.log(this.state);
        console.log(this.context);

        if (this.context != null && this.context != undefined) {
            (this.context as AppContextInterface).appContainer.storageFactory.getLocalStorage()
                .getObject(STORAGE_LATEST_LOCATION_KEY)
                .then(
                    (val: any) => {
                        console.log(val);
                        if (val != null && val != undefined) {

                            this.shopProvinceOrRegion = val.provinceOrRegion
                            this.shopCountry = val.country;
                            this.shopCity = val.city;

                        }
                    }
                ).catch(
                    (error: any) => {
                        console.log(error)
                    }
                ).finally(
                    () => {
                        console.log("Content loaded");

                        this.setState({
                            provinceOrRegion: this.shopProvinceOrRegion,
                            country: this.shopCountry,
                            city: this.shopCity,
                            chooseLocation: true
                        });
                    }
                )
        }
    }

    private _loadData = () => {
        if (this.context != undefined) {

            (this.context as AppContextInterface).appContainer
                .storageFactory.getLocalStorage()
                .storeObject(STORAGE_LATEST_LOCATION_KEY,
                    {
                        provinceOrRegion: this.shopProvinceOrRegion,
                        country: this.shopCountry,
                        city: this.shopCity
                    }
                );

            (this.context as AppContextInterface).appContainer
                .controllerFactory.getUserController()
                .getShops(
                    {
                        country: this.shopCountry,
                        provinceOrRegion: this.shopProvinceOrRegion,
                        city: this.shopCity
                    },

                    new GetUserShopsPresenter(this.getUserShopsViewModel)
                );
        }

    }

    private _crenderLocationChooser = () => {
        if (this.state.chooseLocation) {
            return (
                <View style={{ width: '50%' }}>
                    <View>
                        <Text style={styles.editor_section_header}>Choose Location</Text>
                    </View>

                    <View style={styles.editor_section_container}>
                        <Text style={styles.editor_section_title}>Country</Text>
                        <TextInput
                            defaultValue={this.state.country}
                            onChangeText={(text) => { this.shopCountry = "" + text }}
                        />
                    </View>
                    <View style={styles.editor_section_container}>
                        <Text style={styles.editor_section_title}>Province/Region</Text>
                        <TextInput
                            defaultValue={this.state.provinceOrRegion}
                            onChangeText={(text) => { this.shopProvinceOrRegion = "" + text }}
                        />
                    </View>
                    <View style={styles.editor_section_container}>
                        <Text style={styles.editor_section_title}>City</Text>
                        <TextInput
                            defaultValue={this.state.city}
                            onChangeText={(text) => { this.shopCity = "" + text }}
                        />
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <TouchableOpacity onPress={this._loadData}>
                            <Text style={{
                                color: '#FFFFFF',
                                backgroundColor: "blue",
                                borderRadius: 10,
                                textAlign: 'center',
                                paddingTop: 10, paddingBottom: 10

                            }} >Go</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <Text>SPLASH SCREEN</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this._crenderLocationChooser()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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

});



const mapsStateToProps = (state: any) => {
    return state;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: any) => { dispatch(action); }
    }
}
export default connect(mapsStateToProps, mapDispatchToProps)(SplashScreen);