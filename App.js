import React from 'react';
import HomeScreen from './screens/app/HomeScreen'
import SignUpForm from './screens/auth/SignUpForm'
import LogInForm from './screens/auth/LogInForm'
import AuthLoadingScreen from './screens/loading/AuthLoadingScreen';
import { PersistGate } from 'redux-persist/integration/react'

import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {persistor, store} from './data/users/store';
import {Provider} from 'react-redux';


import Example from './screens/Example';
import RoutesList from './screens/app/RoutesList';
import {Button, Icon, Right} from 'native-base';
import {SearchButton} from './components/navigation/SearchButton';
import {DrawerButton} from './components/navigation/DrawerButton';

const AuthStack = createStackNavigator({
    LogIn: {
        screen: LogInForm,
        navigationOptions: {
            headerTitle: 'Log In',
        },
    },
    SignUp: {
        screen: SignUpForm,
        navigationOptions: {
            headerTitle: 'Create Account',
        },
    }
});


const MainTabs = createMaterialTopTabNavigator({
    Nearby: {
        screen: RoutesList,
        navigationOptions: {
            tabBarLabel: 'Nearby',
        },
    },
    ForYou: {
        screen: RoutesList,
        navigationOptions: {
            tabBarLabel: 'For You',
        },
    },
    Saved: {
        screen: RoutesList,
        navigationOptions: {
            tabBarLabel: 'Saved',
        },
    },
});

const SideMenu = createStackNavigator({
    SettingsList: {
        screen: Example,
        navigationOptions: {
            headerTitle: 'Settings List',
        },
    },
    Profile: {
        screen: Example,
        navigationOptions: {
            headerTitle: 'Profile',
        },
    },
});

const MainDrawer = createDrawerNavigator({
    MainTabs: MainTabs,
    SideMenu: SideMenu,
});

const AppModalStack = createStackNavigator(
    {
        App: MainDrawer,
        Route: {
            screen: Example,
        },
    },
    {
        headerMode: 'screen',
        headerBackTitleVisible: false,
        defaultNavigationOptions: () => {
            return {
                headerTitle: 'Routes',
                headerLeft: <DrawerButton/>
            }
        }
    }
);

const AppContainer = createAppContainer(
    createSwitchNavigator({
        Loading: {
            screen: AuthLoadingScreen,
        },
        Auth: {
            screen: AuthStack,
        },
        App: {
            screen: AppModalStack,
        },
    })
);


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppContainer/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
