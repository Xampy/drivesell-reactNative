import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { DEFALT_LIST_DATA } from '../../../../../assets/data/default-list';
import BackWithTitleTopBarComponent from '../../../components/core/back-with-title-top-bar.component';
import MenuWithTitleTopBarComponent from '../../../components/core/menu-with-tile-top-bar.component';
import TitleTopBarComponent from '../../../components/core/title-top-bar.component';
import DiscussionsListItemComponent from '../../../components/discussion/discussions-list-item.component';


interface IProps {
    navigation: any
}

interface IState {

}

class DiscussionsListScreen extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);
    }

    private _handleDiscussionClick = () => {
        this.props.navigation.navigate(
            "Discussion-Screen",
            {
                discussion: "1"
            }
        );
    } 

    private _renderDiscussion = ({item}: any) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={this._handleDiscussionClick}>
                <DiscussionsListItemComponent/>
            </TouchableOpacity>
        )
    }
    private _toggleDrawerNavigation = () => {
        console.log(this.props);
        if (this.props.navigation != undefined)
            this.props.navigation.toggleDrawer();
    }
    render(){
        return(
            <View style={styles.container}>
                <MenuWithTitleTopBarComponent toggler={this._toggleDrawerNavigation} title={"Discussions"} />
                <View style={ styles.discussion_items_container } >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={ DEFALT_LIST_DATA }
                        renderItem={this._renderDiscussion}
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
        backgroundColor:"#FFFFFF"
    },
    discussion_items_container: {
        padding: 10
    }
});

export default DiscussionsListScreen;