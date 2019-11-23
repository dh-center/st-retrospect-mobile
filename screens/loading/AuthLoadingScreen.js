import React from 'react';
import {View} from 'react-native';
import {store} from '../../data/users/store';
import Loader from '../../components/common/Loader';

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        const authToken = store.getState().authToken;
        this.props.navigation.navigate(authToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View>
                <Loader />
            </View>
        );
    }
}
