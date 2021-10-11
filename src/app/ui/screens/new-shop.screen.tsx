import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { AppContextInterface } from '../../app.context';
import ShopEntity from '../../domain/entity/shop.entity';
import NewUserShopCreatePresenter, { NewShopViewModel } from '../../infrastructure/presenter/new-user-shop-create.presenter';
import MenuWithTitleTopBarComponent from '../components/core/menu-with-tile-top-bar.component';
import { ADD_USER_SHOP, UserShopActionType } from '../store/myShop/type';

interface IProps {
    context?: AppContextInterface,
    navigation?: any,
    dispatch?: (action: UserShopActionType) => void
}

interface IState {
    step: number
}

class NewShopScreen extends React.Component<IProps, IState> {

    private shopName: string;
    private shopDescription: string;
    private shopCity: string;
    private shopProvinceOrRegion;
    private shopCountry;
    private createUserShopViewModel: NewShopViewModel;

    constructor(props: any) {
        super(props);

        this.state = {
            step: 1
        }

        this.shopName = "";
        this.shopDescription = "";
        this.shopCity = "Lome",
            this.shopProvinceOrRegion = "Maritime";
        this.shopCountry = "Togo";

        this.createUserShopViewModel = {
            setShopValue: (shop) => {
                console.log("In neww shop screen ", shop);

                if (shop != null) {

                    let payload: ShopEntity = shop; //clone shop object
                    let action: UserShopActionType = {
                        type: ADD_USER_SHOP,
                        payload: payload
                    }
                    if (this.props.dispatch != undefined) {
                        this.props.dispatch(action);
                        
                        if(this.props.navigation != undefined)
                            this.props.navigation.navigate("My Shops");
                    }
                }
            }
        }


    }

    componentDidMount() {
        console.log("In new shop", this.context);
        console.log("\n\n\n\nIn new shop", this.props.navigation);
        console.log("\n\n\n\nNew shop screen ", Object.keys(this.props));
        console.table(Object.keys(this.props));
    }

    private _handleCreateShopBtnClick = () => {
        if (this.shopName.length > 0 &&
            this.shopDescription.length >= 0 &&
            this.shopCountry.length > 0 &&
            this.shopProvinceOrRegion.length > 0 &&
            this.shopCity.length > 0) {
            if (this.props.context != undefined) {

                this.props.context.appContainer
                    .controllerFactory.getShopController()
                    .createShop(
                        {
                            shopName: this.shopName,
                            shopDescription: this.shopDescription,
                            shopCity: this.shopCity,
                            shopProvinceOrRegion: this.shopProvinceOrRegion,
                            shopCountry: this.shopCountry
                        },
                        new NewUserShopCreatePresenter(this.createUserShopViewModel)
                    );
            }
        } else {
            console.log("Hop name length not allowed");
        }
    }

    private _renderCreateForm = () => {
        if (this.state.step == 1) {
            //Shop name
            return (
                <View>
                    <Text style={styles.input_header}>Shop's name</Text>
                    <TextInput
                        style={styles.input_shop_name}
                        onChangeText={(text) => this.shopName = "" + text}
                    />
                    <TouchableOpacity onPress={() => { this.setState({ step: 2 }) }}>
                        <Text style={styles.create_btn}>Next</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.step == 2) {
            //Shop description
            return (
                <View>
                    <Text style={styles.input_header}>Description(optional)</Text>
                    <TextInput
                        style={styles.input_shop_name}
                        onChangeText={(text) => this.shopDescription = "" + text}
                    />
                    <TouchableOpacity onPress={() => { this.setState({ step: 3 }) }}>
                        <Text style={styles.create_btn}>Next</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.step == 3) {
            //City Country Province/Region 
            return (
                <View>
                    <Text style={styles.input_header}>Address</Text>
                    <TextInput
                        style={styles.input_shop_name}
                        placeholder="Country"
                        defaultValue={this.shopCountry}
                        onChangeText={(text) => this.shopCountry = "" + text}
                    />
                    <TextInput
                        style={styles.input_shop_name}
                        placeholder="Province/Region"
                        defaultValue={this.shopProvinceOrRegion}
                        onChangeText={(text) => this.shopProvinceOrRegion = "" + text}
                    />
                    <TextInput
                        style={styles.input_shop_name}
                        placeholder="City"
                        defaultValue={this.shopCity}
                        onChangeText={(text) => this.shopCity = "" + text}
                    />
                    <TouchableOpacity onPress={() => { this.setState({ step: 4 }) }}>
                        <Text style={styles.create_btn}>Next</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.step == 4) {
            //confirm and create
            return (
                <View>
                    <Text style={styles.input_header}>Confirm</Text>
                    <Text>{this.shopName}</Text>
                    <Text>{this.shopDescription}</Text>
                    <Text>{this.shopProvinceOrRegion + "," + this.shopCity + "-" + this.shopCountry}</Text>
                    <TouchableOpacity onPress={this._handleCreateShopBtnClick}>
                        <Text style={styles.create_btn}>Create Shop</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if(this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }



    render() {
        return (
            <View style={styles.container}>
                <MenuWithTitleTopBarComponent toggler={this._toggleDrawerNavigation} title={"New Shop"} />

                <View style={styles.data_container}>
                    <View style={styles.input_container}>
                        <TouchableOpacity style={{ marginBottom: 20 }}
                            onPress={
                                () => {
                                    const val = 0 + this.state.step;
                                    if (val - 1 > 0)
                                        this.setState({ step: val - 1 });
                                }
                            }>
                            <AntDesign name={"arrowleft"} size={30} color={"#000000"} />
                        </TouchableOpacity>
                        {this._renderCreateForm()}
                    </View>
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
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input_container: {
        width: 250
    },
    input_header: {
        color: 'gray',
    },
    input_shop_name: {
        padding: 5,
        paddingBottom: 10,
        marginTop: 10
    },

    create_btn: {
        paddingTop: 10,
        marginTop: 20,
        paddingBottom: 10,
        textAlign: 'center',
        backgroundColor: 'blue',
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 20
    }
});

const mapsStateToProps = (state: any) => {
    return state;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: UserShopActionType) => { dispatch(action); }
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(NewShopScreen);