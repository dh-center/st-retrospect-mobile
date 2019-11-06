import React, { Component } from 'react';
import { Container, Button, Icon, Tabs, Tab, StyleProvider, Header, Left, Right, Title, Body } from 'native-base';
import RoutesList from './RoutesList'
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {store} from '../../data/users/store';
import {REMOVE_AUTH_TOKEN} from '../../data/users/action_types';

//TODO: Make Menu button functional
function showSearchBar() {
    // store.dispatch({type: REMOVE_AUTH_TOKEN});
    // this.props.navigation.navigate('Auth');
    // TODO
}
export default class HomeScreen extends Component {
    navigation = this.props.navigation;

    static navigationOptions = ({ navigation }) => ({

        header: (
            <StyleProvider  style={getTheme(commonColor)}>
                <Header>
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
                            <Icon name='search' onPress={showSearchBar()}/>
                        </Button>
                    </Right>
                </Header>
            </StyleProvider>
        )
    });
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
