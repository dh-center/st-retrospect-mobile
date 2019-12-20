import React, {Component} from 'react';

import {Button, Container, Text} from 'native-base';
import {store} from '../../redux/store';

export default class LogOut extends Component {
    onLogOut() {
        store.dispatch({type: 'REMOVE_AUTH_TOKEN'});
        store.dispatch({type: 'LOGOUT'});
        this.props.navigation.navigate('Auth');
    }
    render() {
        return (
            <Container>
                <Text>Profile</Text>
                <Button onPress={this.onLogOut()}>
                    <Text>Log Out</Text>
                </Button>
            </Container>
        );
    }
}
