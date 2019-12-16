import React, {Component} from 'react';
import {Container, StyleProvider, Tab, Tabs} from 'native-base';
import NearRoutesList from './NearRoutesList';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {t} from '../../locales/i18n';
import SavedRoutesList from './SavedRoutesList';
import ForYouRoutesList from './LikedRoutesList';

class HomeScreen extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Tabs>
                        <Tab textStyle={{color: '#fff'}} heading={t('nearby')}>
                            <NearRoutesList />
                        </Tab>
                        <Tab textStyle={{color: '#fff'}} heading={t('saved')}>
                            <SavedRoutesList />
                        </Tab>
                        <Tab textStyle={{color: '#fff'}} heading={t('liked')}>
                            <ForYouRoutesList />
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>
        );
    }
}

export default HomeScreen;
