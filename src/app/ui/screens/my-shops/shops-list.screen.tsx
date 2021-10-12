import * as React from 'react';
import { TouchableOpacity, View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ShopEntity from '../../../domain/entity/shop.entity';
import MenuWithTitleTopBarComponent from '../../components/core/menu-with-tile-top-bar.component';
import ShopListItemComponent from '../../components/shop/shop-list-item.component';
import { RootStateType } from '../../store';
import { UserShopActionType } from '../../store/myShop/type';


interface IProps {
    dispatch: (action: UserShopActionType) => void,
    navigation: any,
    shops: ShopEntity[]
}

interface IState {

}

class ShopsListScreen extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);

        console.log("My Shops list : ", this.props);
    }


    private _updateShop = (shop: ShopEntity) => {
        if(this.props.navigation != undefined)
            this.props.navigation.navigate(
                "Shop-Update-Screen", 
                {
                    shop: shop
                }
            )
    }

    private _renderShop = ({item}: any) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={
                () => {
                    this._updateShop(item);
                }
            }>
                <ShopListItemComponent 
                    name={item.name} description={item.description}
                    distance={0} time={0} ></ShopListItemComponent>
            </TouchableOpacity>
        );  
    }

    

    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if(this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }


    render() {
        return (
            <View style={styles.container}>
                <MenuWithTitleTopBarComponent toggler={this._toggleDrawerNavigation} title={"Shops list"} />

                <View style={styles.data_container}>
                    <FlatList
                        data={this.props.shops}
                        renderItem={this._renderShop}
                        keyExtractor={(item) => item.getId().toString()}
                    />
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
        padding: 10
    },
    shop_item_container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 40,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    },
    shop_item_title: {
        color: "gray",
        fontSize: 19,
    },
    shop_item_value: {
        marginTop: 10,
        color: "#000000",
        fontSize: 25,
        fontWeight: 'bold'
    },
});


const mapsStateToProps = (state: RootStateType) => {
    console.log("sdd", state);
    return state.userShopReducer
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: UserShopActionType) => { dispatch(action); }
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(ShopsListScreen);