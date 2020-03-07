import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SearchBar from '../components/navigation/SearchBar';

import LogOut from '../screens/auth/LogOut';
import LoadingScreen from '../screens/loading/LoadingScreen';

import {AuthStack} from './auth';
import {RoutesScreen} from './routes';

const MainDrawer = createDrawerNavigator({
    Routes: RoutesScreen,
    'Log Out': LogOut,
});

const AppModalStack = createStackNavigator(
    {
        App: MainDrawer,
        Search: SearchBar,
    },
    {
        headerMode: 'none',
    },
);

export const AppContainer = createAppContainer(
    createSwitchNavigator({
        Loading: {
            screen: LoadingScreen,
        },
        Auth: {
            screen: AuthStack,
        },
        App: {
            screen: AppModalStack,
        },
    }),
);
