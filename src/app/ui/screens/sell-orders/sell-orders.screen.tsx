import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DEFALT_LIST_DATA } from '../../../../assets/data/default-list';
import MultipleChoiceItemContainerComponent from '../../components/core/multiple-choice/multiple-choice-items-container.component';
import TitleTopBarComponent from '../../components/core/title-top-bar.component';
import SellOrdersListItemComponent from '../../components/orders/sell-orders-list-item.component';

class SellOrdersScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TitleTopBarComponent title={"Sell orders"} />

                <View style={{padding: 10}}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Filters</Text>
                        <MultipleChoiceItemContainerComponent />
                    </View>

                    <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={ DEFALT_LIST_DATA }
                        renderItem={({item}) => <SellOrdersListItemComponent/>}
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
    }
});

export default SellOrdersScreen;