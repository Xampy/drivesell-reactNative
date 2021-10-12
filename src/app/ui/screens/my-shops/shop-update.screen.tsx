import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ShopEntity from '../../../domain/entity/shop.entity';
import MenuWithTitleTopBarComponent from '../../components/core/menu-with-tile-top-bar.component';

interface IProps {
    navigation: any,
    route: any
}

interface IState {

}

class ShopUpdateScreen extends React.Component<IProps, IState> {

    private shop: ShopEntity;

    constructor(props: any){
        super(props);

        console.log(this.props.route);
        //this.shop = 
    }

    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }

    render(){
        return (
            <View style={styles.container}>
                <MenuWithTitleTopBarComponent title={"Shop Update"} toggler={this._toggleDrawerNavigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
});


export default ShopUpdateScreen;