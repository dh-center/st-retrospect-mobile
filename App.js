import React from 'react';
import LogOut from './screens/auth/LogOut';
import SignUpForm from './screens/auth/SignUpForm';
import LogInForm from './screens/auth/LogInForm';
import AuthLoadingScreen from './screens/loading/AuthLoadingScreen';
import {PersistGate} from 'redux-persist/integration/react';
import * as RNLocalize from 'react-native-localize';
import {setI18nConfig, t} from './locales/i18n';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {persistor, store} from './data/users/store';
import {Provider} from 'react-redux';

import SearchButton from './components/navigation/SearchButton';
import DrawerButton from './components/navigation/DrawerButton';
import getTheme from './theme/components';
import commonColor from './theme/variables/commonColor';
import {Body, Container, Header, Left, Right, StyleProvider, Title} from 'native-base';
import HomeScreen from './screens/app/HomeScreen';
import RouteDescription from './screens/app/RouteDescription';
import SearchBar from './components/navigation/SearchBar';
import i18n from 'i18n-js';
import {SET_LOCALE} from './data/users/action_types';
import RouteNavigation from './screens/app/RouteNavigation';


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


const RoutesScreen = createStackNavigator(
    {
        Home: HomeScreen,
        RouteDescription: {
            screen: RouteDescription,
        },
        RouteNavigation: {
            screen: RouteNavigation,
        }

    },
    {
        headerMode: 'screen',
        headerBackTitleVisible: false,
        defaultNavigationOptions: ({ navigation }) => ({
            header: <StyleProvider  style={getTheme(commonColor)}>
                <Header>
                    <Left>
                        <DrawerButton navigation={navigation}/>
                    </Left>
                    <Body>
                    <Title>{t('routes')}</Title>
                    </Body>
                    <Right>
                        <SearchButton navigation={navigation}/>
                    </Right>
                </Header>
            </StyleProvider>
        }),
    }
);

const MainDrawer = createDrawerNavigator({
    Routes: RoutesScreen,
    'Log Out': LogOut
});



const AppModalStack = createStackNavigator(
    {
        App: MainDrawer,
        Search: SearchBar,
    },
    {
        headerMode:'none'

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
    constructor(props) {
        super(props);
        setI18nConfig();
        store.dispatch({type: SET_LOCALE, locale: i18n.locale});
    }

    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        store.dispatch({type: SET_LOCALE, locale: i18n.locale});
        this.forceUpdate();
    };
    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <AppContainer/>
                        </PersistGate>
                    </Provider>
                </Container>
            </StyleProvider>
        );
    }
}

export default App;
