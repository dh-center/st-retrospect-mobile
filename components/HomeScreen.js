import React, { Component } from 'react';

import { Container, Button, Icon, Tabs, Tab, StyleProvider } from 'native-base';

import RoutesList from './RoutesList'
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';
import { AsyncStorage } from 'react-native';

//TODO: Create nearby, for you, saved components for routes
//TODO: Make Search button functional
//TODO: Make Menu button functional
export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Routes',
        headerLeft: () => (
            <Button transparent>
                <Icon ios='ios-menu' android="md-menu" />
            </Button>
        ),
        headerRight: () => (
            <Button transparent>
                <Icon name='exit'/>
            </Button>
        )
    };
    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Tabs >
                        <Tab heading="NEARBY">
                            <RoutesList/>
                        </Tab>
                        <Tab heading="FOR YOU">
                            <RoutesList/>
                        </Tab>
                        <Tab heading="SAVED">
                            <RoutesList/>
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>
        );
    };
}
