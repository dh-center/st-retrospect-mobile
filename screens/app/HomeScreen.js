import React, { Component } from 'react';
import { Container, Tabs, Tab, StyleProvider } from 'native-base';
import NearRoutesList from './NearRoutesList'
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {withNavigation} from 'react-navigation';
import {t} from '../../locales/i18n';
import Navigation from './Navigation';
import SavedRoutesList from './SavedRoutesList';
import ForYouRoutesList from './ForYouRoutesList';


class HomeScreen extends Component {

    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Tabs >
                        <Tab heading={t('nearby')}>
                            <NearRoutesList/>

                        </Tab>
                        <Tab heading={t('saved')}>
                            <SavedRoutesList/>
                        </Tab>
                        <Tab heading={t('liked')}>
                            <ForYouRoutesList/>
                        </Tab>
                    </Tabs>

                </Container>
            </StyleProvider>
        );
    };
}

export default HomeScreen
