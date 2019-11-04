import React from 'react';
import HomeScreen from './components/HomeScreen'
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm'
import AuthLoadingScreen from './components/AuthLoadingScreen';
import { PersistGate } from 'redux-persist/integration/react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {persistor, store} from './data/users/store';
import {Provider} from 'react-redux';


const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ LogIn: LogInForm, SignUp: SignUpForm});

const AppContainer =  createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
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
