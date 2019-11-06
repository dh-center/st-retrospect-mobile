import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import { store} from '../../data/users/store';

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        const authToken = store.getState().authToken;
        this.props.navigation.navigate(authToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
