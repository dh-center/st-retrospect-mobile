import React, { Component } from 'react';
import { Container, Button, Icon, Tabs, Tab, StyleProvider, Header, Left, Right, Title, Body } from 'native-base';
import RoutesList from './RoutesList'
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';



import {withNavigation} from 'react-navigation';
import {t} from '../../locales/i18n';


class HomeScreen extends Component {

    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Tabs >
                        <Tab heading={t('nearby')}>
                            <RoutesList/>
                        </Tab>
                        <Tab heading={t('for you')}>
                            <RoutesList/>
                        </Tab>
                        <Tab heading={t('saved')}>
                            <RoutesList/>
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>
        );
    };
}

export default withNavigation(HomeScreen)
