import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContext, { AppContextInterface } from '../../../app.context';
import GetUserShopsPresenter, { GetUserShopsViewModel } from '../../../infrastructure/presenter/get-user-shops.presenter';


interface IProps {
    onLoad: Function
}

interface IState {

}

class SplashScreen extends React.Component<IProps, IState> {

    static contextType = AppContext;

    private getUserShopsViewModel: GetUserShopsViewModel;

    constructor(props: any){
        super(props);

        this.getUserShopsViewModel = {
            setShopsValue: (shops) => {
                console.log(shops);
            }
        }
    }

    componentDidMount(){
        console.log(this.state);
        console.log(this.context);

        if(this.context != undefined){
            (this.context as AppContextInterface).appContainer
                .controllerFactory.getUserController()
                .getShops(
                    {
                        country: "Togo",
                        provinceOrRegion: "Maritime",
                        city: "Lome"
                    },

                    new GetUserShopsPresenter(this.getUserShopsViewModel)
                )
        }

        /*setTimeout(() => {
            console.log("Time gone");

            if(this.props.onLoad != undefined){
                this.props.onLoad();
            }
        }, 2000);*/
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>SPLASH SCREEN</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SplashScreen