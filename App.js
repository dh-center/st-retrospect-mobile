import React from 'react';
import HomeScreen from './components/HomeScreen'
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ LogIn: LogInForm, SignUp: SignUpForm});

export default createAppContainer(
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
