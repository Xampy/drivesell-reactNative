import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DEFALT_LIST_DATA } from '../../../../../assets/data/default-list';
import TitleTopBarComponent from '../../../components/core/title-top-bar.component';
import DiscussionsListItemComponent from '../../../components/discussion/discussions-list-item.component';
import NotificationsListItem from '../../../components/notification/notifications-list-item.component';

class NotificationsScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <TitleTopBarComponent title={"Notifications"}/>

                <View style={ styles.notification_items_container } >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={ DEFALT_LIST_DATA }
                        renderItem={({item}) => <NotificationsListItem/>}
                        keyExtractor={(item) => item.id.toString()}
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

    notification_items_container: {
        padding: 10
    }
});

export default NotificationsScreen;