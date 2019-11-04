import React, { Component } from 'react';
import { Container, Button, Icon, Tabs, Tab, StyleProvider, Header, Left, Right, Title, Body } from 'native-base';
import RoutesList from './RoutesList'
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';

//TODO: Create nearby, for you, saved components for routes
//TODO: Make Search button functional
//TODO: Make Menu button functional
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accessToken: this.props.navigation.getParam('accessToken'),
        };
    };
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
                            <Icon name='search'/>
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
                            <RoutesList accessToken={this.state.accessToken}/>
                        </Tab>
                        <Tab heading="FOR YOU">
                            <RoutesList accessToken={this.state.accessToken}/>
                        </Tab>
                        <Tab heading="SAVED">
                            <RoutesList accessToken={this.state.accessToken}/>
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>
        );
    };
}
