import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MultipleChoiceItemComponent from './multiple-choice-item.component';



const choices =[
    "All",
    "Education",
    "Clothes",
    "Gaming",
    "TV",
    "Kitchen",
    "Business",
    "Tech"
]

class MultipleChoiceItemContainerComponent extends React.Component {
    render(){
        return(
            <View style={styles.container} >
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={choices}
                    renderItem={({item}) => <MultipleChoiceItemComponent text={item} isActive={false}/>}
                    keyExtractor={(item) => item}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 1
    }
});

export default MultipleChoiceItemContainerComponent;