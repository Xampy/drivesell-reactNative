import * as React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DEFALT_LIST_DATA } from '../../../../../assets/data/default-list';
import MultipleChoiceItemContainerComponent from '../../../components/core/multiple-choice/multiple-choice-items-container.component';
import TitleTopBarComponent from '../../../components/core/title-top-bar.component';
import ProductComponent from '../../../components/product/product.component';
import ShopDetailModalComponent from '../../../components/shop/ccore/shop-detail-modal.component';
import ShopListItemComponent from '../../../components/shop/shop-list-item.component';



interface IProps {
    navigation: any,
    router: any
}

interface IState {
    hasSearchResult: boolean,
    title: string,
    hasChoosedAShop: boolean
}

class ShopsListScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            hasSearchResult: false,
            title: "Shops",
            hasChoosedAShop: false
        }
    }


    private _renderShop = ({ item }: any) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={
                () => {
                    this._setViewingDetailModalVisible(true);
                }
            }>
                <ShopListItemComponent></ShopListItemComponent>
            </TouchableOpacity>
        );  
    }

    private _renderShopDetailModal = () => {
        if (this.state.hasChoosedAShop) {
            return (
                <ShopDetailModalComponent
                    showMap={true}
                    hasChoosedShopProduct={
                        () => {
                            this.props.navigation.navigate(
                                "Shop-Item-Detail-Screen",
                                {
                                    product: "1"
                                }
                            )
                        }
                    }
                    onRequestCloseCallback={() => { this._setViewingDetailModalVisible(false) }}/>
            )
        }
    }

    private _setViewingDetailModalVisible = (value: boolean) => {
        this.setState({
            hasChoosedAShop: value
        });
    }


    private _toggleSearchBar = () => {
        if (this.state.hasSearchResult) {
            return (
                <View style={{ padding: 10 }}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                this.setState({
                                    hasSearchResult: false,
                                    title: "Shops"
                                });
                            }}>
                            <Text style={
                                { color: 'gray', padding: 5, borderColor: 'gray',
                                borderWidth: 1, borderRadius: 10}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.search_input_container}>
                        <View style={{ flex: 4 }}>
                            <TextInput
                                style={styles.search_input}
                                placeholder={ "Search" }
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        hasSearchResult: true,
                                        title: "Search Result"
                                    });
                                }}>
                                <Text style={styles.search_btn}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Filters</Text>
                        <MultipleChoiceItemContainerComponent />
                    </View>
                </View>
            )
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <TitleTopBarComponent title={this.state.title} />
                <View style={styles.data_container}>
                    {this._renderShopDetailModal()}

                    {this._toggleSearchBar()}

                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={DEFALT_LIST_DATA}
                            renderItem={this._renderShop}
                            keyExtractor={(item) => item.id.toString()}
                        />
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
        padding: 10
    },
    search_input_container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFFFFF'
    },
    search_input: {
        width: '100%',
        height: 50,
        borderWidth: 0,
        borderRadius: 20,
        padding: 5,

    },

    search_btn: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        color: "#FFFFFF",
        backgroundColor: "blue",
        fontSize: 11,
        borderRadius: 10,
        fontWeight: 'bold'
    }
});

export default ShopsListScreen;