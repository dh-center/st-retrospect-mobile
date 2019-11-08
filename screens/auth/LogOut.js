import React, { Component } from 'react';

import {Container, Text, Button} from 'native-base'
import {store} from '../../data/users/store';
import {REMOVE_AUTH_TOKEN} from '../../data/users/action_types';


/*TODO: replace 'ru' with user language settings*/
export default class RouteItem extends Component {
    onLogOut() {
        console.log('log out');
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
        )
    }
};

