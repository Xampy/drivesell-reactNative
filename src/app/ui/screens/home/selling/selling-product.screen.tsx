import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import DefaultTopBarComponent from '../../../components/core/default-top-bar.component';
import ProductComponent from '../../../components/product/product.component';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFALT_LIST_DATA } from '../../../../../assets/data/default-list';

interface IProps {
    navigation: any,
    router: any
}

interface IState {

}

class SellingProductScreen extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);
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

    private _renderProduct = ({item}: any) => {
        console.log(item);
        return (
            <ProductComponent 
                product={item} 
                handleDiscussionClick={this._handleDiscussionClick}
                handleImageClick={this._handleImageClick}
                handleTopClick={this._handleTopClick}>
            </ProductComponent>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <DefaultTopBarComponent></DefaultTopBarComponent>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ DEFALT_LIST_DATA }
                    renderItem={this._renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                />
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 10
    }
});


export default SellingProductScreen;