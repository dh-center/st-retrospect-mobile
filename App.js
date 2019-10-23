import React from 'react';
import HomeScreen from './components/HomeScreen'
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignUp: SignUpForm, LogIn: LogInForm });

const App = createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Auth',
        }
    )
);


export default App;
