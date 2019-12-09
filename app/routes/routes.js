import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Body, Header, Left, Right, StyleProvider, Title} from 'native-base';

import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';

import DrawerButton from '../components/navigation/DrawerButton';
import SearchButton from '../components/navigation/SearchButton';

import HomeScreen from '../screens/app/HomeScreen';
import RouteDescription from '../screens/app/RouteDescription';
import RouteNavigation from '../screens/app/RouteNavigation';
import RouteFinish from '../screens/app/RouteFinish';

import {t} from '../locales/i18n';

export const RoutesScreen = createStackNavigator(
    {
        Home: HomeScreen,
        RouteDescription: {
            screen: RouteDescription,
        },
        RouteNavigation: {
            screen: RouteNavigation,
        },
        RouteFinish: {
            screen: RouteFinish,
        },
    },
    {
        headerMode: 'screen',
        headerBackTitleVisible: false,
        defaultNavigationOptions: ({navigation}) => ({
            header: (
                <StyleProvider style={getTheme(commonColor)}>
                    <Header>
                        <Left>
                            <DrawerButton navigation={navigation} />
                        </Left>
                        <Body>
                            <Title>{t('routes')}</Title>
                        </Body>
                        <Right>
                            <SearchButton navigation={navigation} />
                        </Right>
                    </Header>
                </StyleProvider>
            ),
        }),
    },
);
