import React, { Component } from 'react';
import { Container, Tabs, Tab, StyleProvider } from 'native-base';
import RoutesList from './RoutesList'
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {withNavigation} from 'react-navigation';
import {t} from '../../locales/i18n';
import Navigation from './Navigation';


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

export default HomeScreen
