import React, {Component} from 'react';

import {Button, Container, Text} from 'native-base';
import {store} from '../../redux/users/store';
import {REMOVE_AUTH_TOKEN} from '../../redux/users/action_types';

export default class LogOut extends Component {
    onLogOut() {
        store.dispatch({type: REMOVE_AUTH_TOKEN});
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
