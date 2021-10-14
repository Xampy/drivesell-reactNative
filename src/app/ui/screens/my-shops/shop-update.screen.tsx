import CheckBox from '@react-native-community/checkbox';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import { AppContextInterface } from '../../../app.context';
import ShopEntity from '../../../domain/entity/shop.entity';
import UpdateUserShopPresenter, { UpdateShopViewModel } from '../../../infrastructure/presenter/update-user-shop.presenter';
import BackWithTitleTopBarComponent from '../../components/core/back-with-title-top-bar.component';
import MenuWithTitleTopBarComponent from '../../components/core/menu-with-tile-top-bar.component';
import ShopListItemComponent from '../../components/shop/shop-list-item.component';
import { requestLocationPermission } from '../../location.tools';
import { UPDATE_USER_SHOP, UserShopActionType } from '../../store/myShop/type';

interface IProps {
    context: AppContextInterface,
    navigation: any,
    route: any,
    dispatch?: (action: UserShopActionType) => void
}

interface IState {
    name: string,
    description: string,
    country: string,
    provinceOrRegion: string,
    city: string,
    distance: number,
    time: number,
    image_filename: string,
    image_uri: any,

    openEditor: boolean,
    toggleCheckBox: boolean
}

class ShopUpdateScreen extends React.Component<IProps, IState> {

    private shop: ShopEntity;
    private shopName: string;
    private shopDescription: string;
    private shopCountry: string;
    private shopCity: string;
    private shopProvinceOrRegion: string;

    private updateUserShopViewModel: UpdateShopViewModel;
    hasLocationPermission: Promise<boolean | null> | null;

    constructor(props: any) {
        super(props);

        console.log(this.props.route);
        console.log("\n\nIn shop update screen " + this.props);
        console.log(this.props);

        this.hasLocationPermission = null;

        this.updateUserShopViewModel = {
            setShopValue: (shop) => {

                console.log("In update shop screen after update ");
                console.log(shop);

                if (shop != null) {
                    let payload: ShopEntity = shop; //clone shop object
                    let action: UserShopActionType = {
                        type: UPDATE_USER_SHOP,
                        payload: payload
                    }
                    if (this.props.dispatch != undefined) {
                        this.props.dispatch(action);

                    }

                    this.setState({
                        name: this.shopName,
                        description: this.shopDescription,
                        country: this.shopCountry,
                        provinceOrRegion: this.shopProvinceOrRegion,
                        city: this.shopCity,
                        distance: 0,
                        time: 0,

                        openEditor: false
                    })
                }

            }
        }


        console.log(this.props.route);
        this.shop = this.props.route.params.shop;
        //this.shop = 
        this.shopName = this.shop.getName();
        this.shopDescription = this.shop.getDescription();
        this.shopCountry = this.shop.getCountry();
        this.shopProvinceOrRegion = this.shop.getProvinceOrRegion();
        this.shopCity = this.shop.getCity();

        this.state = {
            name: this.shopName,
            description: this.shopDescription,
            country: this.shop.getCountry(),
            provinceOrRegion: this.shop.getProvinceOrRegion(),
            city: this.shop.getCity(),
            distance: 0,
            time: 0,
            image_filename: "filename",
            image_uri: null,

            openEditor: false,
            toggleCheckBox: false
        }

    }

    componentDidMount() {
        this.hasLocationPermission = requestLocationPermission();
    }




    private _setEditorVisibility = (visibile: boolean) => {
        if (visibile == false) {
            this.setState({
                name: this.shopName,
                description: this.shopDescription,
                country: this.shopCountry,
                provinceOrRegion: this.shopProvinceOrRegion,
                city: this.shopCity,
                distance: 0,
                time: 0,

                openEditor: visibile
            });
        } else {
            this.setState({ openEditor: visibile })
        }


    }

    private _renderEditProductBtn = () => {
        if (true) {
            return (
                <TouchableOpacity
                    style={styles.bottom_float_buy_action_container}
                    onPress={() => { this._setEditorVisibility(true) }}>
                    <View style={styles.buy_text_container}>
                        <Text style={styles.buy_text} >Edit Shop</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    private _getImageFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });

            this.setState({
                image_filename: res.name,
                image_uri: res.uri
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err as any)) {

            } else {
                //
            }
        }
    }

    private _updateShop = () => {
        if (this.props.context != undefined) {
            console.log("\n\n\nUpdate shop...");

            const latestLocation = {
                latestShopCity: this.shop.getCity(),
                latestShopProvinceOrRegion: this.shop.getProvinceOrRegion(),
                latestShopCountry: this.shop.getCountry()
            }

            this.shop.setName(this.shopName);
            this.shop.setDescription(this.shopDescription);

            //Sorry for the name
            if (this.state.toggleCheckBox == true) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);

                        this.shop.setLatitude(`${position.coords.latitude}`);
                        this.shop.setLongitude(`${position.coords.longitude}`);

                        this.props.context.appContainer.controllerFactory
                            .getShopController().updateShop(
                                {
                                    shop: this.shop,
                                    ...latestLocation
                                },

                                new UpdateUserShopPresenter(this.updateUserShopViewModel)
                            );

                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                //Don't want to update the postiion
                this.props.context.appContainer.controllerFactory
                    .getShopController().updateShop(
                        {
                            shop: this.shop,
                            ...latestLocation
                        },

                        new UpdateUserShopPresenter(this.updateUserShopViewModel)
                    );
            }


        }

    }


    private _handleCheckBoxToggle = (value: boolean) => {
        this.setState({ toggleCheckBox: value });
    }

    private _renderEditor = () => {

        if (this.state.openEditor) {
            return (
                <KeyboardAvoidingView
                    style={styles.edit_panel_container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}>

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
                        </View>

                        <View style={styles.editor_section_container}>
                            <Text style={styles.editor_section_title}>Shop Position</Text>

                            <View style={styles.editor_image_chooser_container}>
                                <CheckBox
                                    disabled={false}
                                    value={this.state.toggleCheckBox}
                                    onValueChange={(newValue) => this._handleCheckBoxToggle(newValue)}
                                />
                                <Text>Update the shop position</Text>

                            </View>
                        </View>


                        <View style={[styles.editor_section_container, { marginTop: 20 }]}>
                            <Text style={styles.editor_section_title}>Image</Text>

                            <View style={styles.editor_image_chooser_container}>
                                <Text>{this.state.image_filename}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._getImageFile();
                                    }}>
                                    <Text style={styles.editor_image_chooser_btn} >change</Text>
                                </TouchableOpacity>

                            </View>
                        </View>





                        <View>
                            <Text style={styles.editor_section_header}>Shop Informations</Text>
                        </View>

                        <View style={styles.editor_section_container}>
                            <Text style={styles.editor_section_title}>Name</Text>
                            <TextInput
                                defaultValue={this.state.name}
                                onChangeText={(text) => { this.shopDescription = "" + text }}
                            />
                        </View>

                        <View style={styles.editor_section_container}>
                            <Text style={styles.editor_section_title}>Description</Text>
                            <TextInput
                                defaultValue={this.state.description}
                                onChangeText={(text) => { this.shopDescription = "" + text }}
                            />
                        </View>

                        <View>
                            <Text style={styles.editor_section_header}>Shop Location</Text>
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
                            <TouchableOpacity onPress={this._updateShop}>
                                <Text style={{
                                    color: '#FFFFFF',
                                    backgroundColor: "blue",
                                    borderRadius: 10,
                                    textAlign: 'center',
                                    paddingTop: 10, paddingBottom: 10

                                }} >Update Shop</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            )
        }
    }

    private _goBackNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <BackWithTitleTopBarComponent title={"Shop Update"} backCallback={this._goBackNavigation} />

                <View style={{ padding: 10 }}>
                    <ShopListItemComponent
                        name={this.state.name} description={this.state.description}
                        distance={0} time={0} ></ShopListItemComponent>
                </View>

                {this._renderEditProductBtn()}
                {this._renderEditor()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },

    updatorContainer: {
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
});

const mapsStateToProps = (state: any) => {
    console.log(state);
    return state;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: UserShopActionType) => { dispatch(action); }
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(ShopUpdateScreen);