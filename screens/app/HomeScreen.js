import React, { Component } from 'react';
import { Container, Button, Icon, Tabs, Tab, StyleProvider, Header, Left, Right, Title, Body } from 'native-base';
import RoutesList from './RoutesList'
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import { strings } from '../../locales/i18n';


import DrawerButton from '../../components/navigation/DrawerButton';
import {withNavigation} from 'react-navigation';

//TODO: Make Menu button functional
function showSearchBar() {
    // store.dispatch({type: REMOVE_AUTH_TOKEN});
    // this.props.navigation.navigate('Auth');
    // TODO
}
class HomeScreen extends Component {

    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Tabs >
                        <Tab heading={strings('nearby')}>
                            <RoutesList/>
                        </Tab>
                        <Tab heading={strings('for you')}>
                            <RoutesList/>
                        </Tab>
                        <Tab heading={strings('saved')}>
                            <RoutesList/>
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>
        );
    };
}

export default withNavigation(HomeScreen)
