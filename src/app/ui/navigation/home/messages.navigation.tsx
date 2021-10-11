import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DiscussionSingleScreen from '../../screens/home/messages/discussion-single.screen';
import DiscussionsListScreen from '../../screens/home/messages/discussions-list.screen';

const MessagingStack = createStackNavigator();

const MessagingStackNavigator = () => {
    return (
        <MessagingStack.Navigator 
        initialRouteName="Discussions-List-Screen"
        screenOptions={
            {
                headerShown: false
            }
        }>
            
            <MessagingStack.Screen 
                name="Discussions-List-Screen" component={DiscussionsListScreen}/> 
            <MessagingStack.Screen 
                name="Discussion-Screen" component={DiscussionSingleScreen}/> 
        </MessagingStack.Navigator>
    )
}


export default MessagingStackNavigator;