import React, { Component } from 'react';

import { Container, Button, Icon, Tabs, Tab } from 'native-base';

import RoutesList from './RoutesList'

//TODO: Create nearby, for you, saved components for routes
//TODO: Make Search button functional
//TODO: Make Menu button functional
export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Routes',
        headerStyle: {
            backgroundColor: '#3700cc',
        },
        headerTintColor: '#fff',
        headerLeft: () => (
            <Button transparent light>
                <Icon ios='ios-menu' android="md-menu" />
            </Button>
        ),
        headerRight: () => (
            <Button transparent light>
                <Icon name='search' />
            </Button>
        )
    };
    render() {
        return (
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
        );
    }
}
