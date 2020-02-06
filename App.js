import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import * as RNLocalize from 'react-native-localize';
import {setI18nConfig} from './app/locales/i18n';
import {persistor, store} from './app/redux/store';
import {Provider} from 'react-redux';
import getTheme from './app/theme/components';
import commonColor from './app/theme/variables/commonColor';
import {Container, StyleProvider} from 'native-base';
import i18n from 'i18n-js';
import {AppContainer} from './app/routes/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        store.dispatch({type: 'SET_LOCALE', locale: i18n.locale});
    }

    componentDidMount() {
        RNLocalize.addEventListener('change', this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        store.dispatch({type: 'SET_LOCALE', locale: i18n.locale});
        this.forceUpdate();
    };
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <AppContainer />
                        </PersistGate>
                    </Provider>
                </Container>
            </StyleProvider>
        );
    }
}

export default App;
