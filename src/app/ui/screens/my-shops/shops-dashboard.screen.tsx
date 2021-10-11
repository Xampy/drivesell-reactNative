import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopTitleTopBarComponent from '../../components/shop/shop-title-top-bar.component';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


const user_icon = require('../../../../assets/img/user_icon.png');

class ShopsDashboardScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ShopTitleTopBarComponent title={"Dashboard"} />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.data_container} >
                        <View style={styles.balance_container}>
                            <Text style={styles.balance_title}>Your Balance</Text>
                            <Text style={styles.balance_value}>$8000</Text>
                        </View>

                        <View style={styles.options_container}>
                            <View style={styles.option_item_container}>
                                <View style={styles.option_item_image_container} >
                                    <MaterialIcons
                                        name={"add"}
                                        size={40}
                                        color={"#5675E1"} />
                                </View>
                                <Text style={styles.option_item_text}>New Shop</Text>
                            </View>
                            <View style={styles.option_item_container}>
                                <View style={styles.option_item_image_container} >
                                    <MaterialIcons
                                        name={"format-list-bulleted"}
                                        size={40}
                                        color={"green"} />
                                </View>
                                <Text style={styles.option_item_text}>Shop List</Text>
                            </View>
                            <View style={styles.option_item_container}>
                                <View style={styles.option_item_image_container} >
                                    <MaterialCommunityIcons
                                        name={"clock"}
                                        size={40}
                                        color={"#FD7596"} />
                                </View>
                                <Text style={styles.option_item_text}>Activities</Text>
                            </View>
                            <View style={styles.option_item_container}>
                                <View style={styles.option_item_image_container} >
                                    <MaterialCommunityIcons
                                        name={"credit-card"}
                                        size={40}
                                        color={"#3292E7"} />
                                </View>
                                <Text style={styles.option_item_text}>Account</Text>
                            </View>
                        </View>

                        <View style={styles.recent_customers_container}>
                            <View style={styles.recent_customers_container_header}>
                                <View>
                                    <Text style={[{ fontSize: 20, fontWeight: 'bold' }]}>Recent customer</Text>
                                </View>
                                <View>
                                    <Entypo
                                        name={"dots-two-horizontal"}
                                    />
                                </View>
                            </View>


                            <View style={styles.options_container}>
                                <View style={styles.option_item_container}>
                                    <View style={styles.option_item_image_container} >
                                        <Image
                                            source={user_icon}
                                            style={[{ width: 50, height: 50, borderRadius: 25 }]}
                                        />
                                    </View>
                                    <Text style={styles.option_item_text}>Xampy</Text>
                                </View>
                                <View style={styles.option_item_container}>
                                    <View style={styles.option_item_image_container} >
                                        <Image
                                            source={user_icon}
                                            style={[{ width: 50, height: 50, borderRadius: 25 }]}
                                        />
                                    </View>
                                    <Text style={styles.option_item_text}>Pyx</Text>
                                </View>
                                <View style={styles.option_item_container}>
                                    <View style={styles.option_item_image_container} >
                                        <Image
                                            source={user_icon}
                                            style={[{ width: 50, height: 50, borderRadius: 25 }]}
                                        />
                                    </View>
                                    <Text style={styles.option_item_text}>Xam</Text>
                                </View>
                                <View style={styles.option_item_container}>
                                    <View style={styles.option_item_image_container} >
                                        <Image
                                            source={user_icon}
                                            style={[{ width: 50, height: 50, borderRadius: 25 }]}
                                        />
                                    </View>
                                    <Text style={styles.option_item_text}>Pimx</Text>
                                </View>
                            </View>


                        </View>


                        <View style={styles.recent_customers_container}>
                            <View style={styles.recent_customers_container_header}>
                                <View>
                                    <Text style={[{ fontSize: 20, fontWeight: 'bold' }]}>Recent activiy</Text>
                                </View>
                                <View>
                                    <AntDesign
                                        name={"arrowright"}
                                        color={"#3292E8"}
                                        size={30}
                                    />
                                </View>
                            </View>


                            <View style={[
                                { marginTop: 20, display: 'flex', flexDirection: 'row' }]}>
                                <View style={[{flex: 1}]}>
                                    <View style={styles.option_item_image_container} >
                                        <MaterialCommunityIcons
                                            name={"credit-card"}
                                            size={40}
                                            color={"#3292E7"} />
                                    </View>
                                    
                                </View>

                                <View style={[
                                    {flex: 4, display: 'flex', flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'space-between'}]}>
                                    <View>
                                        <Text style={[{fontSize: 15, fontWeight: 'bold'}]}>Transfer</Text>
                                        <Text>12 jan, 2021</Text>
                                    </View>
                                    <View>
                                        <Text style={[{color: "green", fontWeight: 'bold'}]} >+$25</Text>
                                    </View>
                                </View>
                                
                            </View>

                            <View style={[
                                { marginTop: 20, display: 'flex', flexDirection: 'row' }]}>
                                <View style={[{flex: 1}]}>
                                    <View style={styles.option_item_image_container} >
                                        <MaterialCommunityIcons
                                            name={"credit-card"}
                                            size={40}
                                            color={"#3292E7"} />
                                    </View>
                                    
                                </View>

                                <View style={[
                                    {flex: 4, display: 'flex', flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'space-between'}]}>
                                    <View>
                                        <Text style={[{fontSize: 15, fontWeight: 'bold'}]}>Transfer</Text>
                                        <Text>12 jan, 2021</Text>
                                    </View>
                                    <View>
                                        <Text style={[{color: "green", fontWeight: 'bold'}]} >+$25</Text>
                                    </View>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    balance_container: {
        backgroundColor: "#3292E8",
        borderRadius: 20,
        padding: 40
    },
    balance_title: {
        color: "#FFFFFF",
        fontSize: 19,
    },
    balance_value: {
        marginTop: 10,
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: 'bold'
    },
    options_container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    option_item_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 70
    },
    option_item_image_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: "#F6FAFF"
    },
    option_item_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10
    },
    recent_customers_container: {
        marginTop: 30,
        padding: 10
    },
    recent_customers_container_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },


});

export default ShopsDashboardScreen;