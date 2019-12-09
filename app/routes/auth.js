import {createStackNavigator} from 'react-navigation-stack';

import LogInForm from '../screens/auth/LogInForm';
import SignUpForm from '../screens/auth/SignUpForm';

export const AuthStack = createStackNavigator({
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
    },
});
