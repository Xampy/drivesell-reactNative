import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MultipleChoiceItemComponent from '../core/multiple-choice/multiple-choice-item.component';
import MultipleChoiceItemContainerComponent from '../core/multiple-choice/multiple-choice-items-container.component';

interface IProps {
    name: string,
    description: string,
    distance: number,
    time: number,
    location?: string,

    imageUri: any | null
}

interface IState {

}


const shopImage = require('../../../../assets/img/shop/shop-default.jpg');

class ShopListItemComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    private _renderImage = () => {
        if (this.props.imageUri == null) {
            return (
                <Image
                    source={
                        shopImage}
                    style={styles.image}
                />
            );
        }else{
            if(typeof this.props.imageUri == 'string'){
                return (
                    <Image
                        source={{uri: this.props.imageUri}}
                        style={styles.image}
                    />
                );
            }
            return (
                <Image
                    source={this.props.imageUri}
                    style={styles.image}
                />
            );
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.shop_item_image_container}>
                    {this._renderImage()}
                </View>
                <View style={styles.shop_item_container}>
                    <Text style={styles.shop_item_value}>{this.props.name}</Text>
                    {/*<View style={{marginTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            ["Edu", "Gaming", "Shoe", "clothes"].map(
                                (text) => <MultipleChoiceItemComponent size="medium" key={text} text={text} isActive={false}/>
                            )
                        }                    
                    </View>*/}
                    <Text>{this.props.description}</Text>
                    <View style={{
                        margin: 20,
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <MaterialCommunityIcons name="map-marker-distance" size={20} />
                            <Text style={{ marginLeft: 15 }}>{this.props.distance} km</Text>
                        </View>

                        <View>

                        </View>
                        <View style={{
                            marginLeft: 20,
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <AntDesign name="clockcircleo" size={20} />
                            <Text style={{ marginLeft: 15 }}>{this.props.time} min</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        shadowColor: "#000",
        backgroundColor: "#FFFFFF",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    },
    shop_item_image_container: {
        flex: 1
    },
    image: {
        width: 60, height: 60,
        borderRadius: 30
    },
    shop_item_container: {
        flex: 4,
    },
    shop_item_title: {
        color: "gray",
        fontSize: 19,
    },
    shop_item_value: {
        marginTop: 10,
        color: "#000000",
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default ShopListItemComponent;
