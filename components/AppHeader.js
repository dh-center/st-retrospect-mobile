import React, { Component } from 'react';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Tabs, Tab } from 'native-base';

import RoutesList from './RoutesList'

//TODO: Create nearby, for you, saved components for routes
//TODO: Make Search button functional
//TODO: Make Menu button functional
export default class AppHeader extends Component {
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent>
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Routes</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='search' />
                        </Button>
                    </Right>
                </Header>
                <Tabs>
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
