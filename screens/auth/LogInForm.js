import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    StyleProvider,
    Text,
    Title,
} from 'native-base';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {sendLogInRequest} from '../../services/api/requests';
import {store} from '../../data/users/store';
import {SAVE_AUTH_TOKEN} from '../../data/users/action_types';
import {t} from '../../locales/i18n';

export default class SignUpForm extends Component {
    static navigationOptions = ({navigation}) => ({
        header: (
            <StyleProvider style={getTheme(commonColor)}>
                <Header>
                    <Body>
                        <Title>{t('login')}</Title>
                    </Body>
                </Header>
            </StyleProvider>
        ),
    });
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }
    async onLogIn() {
        const {username, password} = this.state;
        if (username && password) {
            sendLogInRequest(username, password).then(result => {
                if (result == 'Err') {
                    alert('Credentials are incorrect. Please try again.');
                } else {
                    store.dispatch({
                        type: SAVE_AUTH_TOKEN,
                        authToken: result.data.accessToken,
                    });
                    this.props.navigation.navigate('App');
                }
            });
        }
    }
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Content>
                        <Form>
                            <Item>
                                <Input
                                    placeholder={t('username')}
                                    onChangeText={username =>
                                        this.setState({username})
                                    }
                                />
                            </Item>
                            <Item>
                                <Input
                                    placeholder={t('password')}
                                    onChangeText={password =>
                                        this.setState({password})
                                    }
                                    secureTextEntry={true}
                                />
                            </Item>
                            <Button
                                title={t('login')}
                                onPress={this.onLogIn.bind(this)}
                                primary
                                block
                                style={{margin: 10}}>
                                <Text>{t('login')}</Text>
                            </Button>
                        </Form>

                        <Button
                            title={t('signup')}
                            onPress={() =>
                                this.props.navigation.navigate('SignUp')
                            }
                            bordered
                            primary
                            block
                            style={{margin: 10}}>
                            <Text>{t('signup')}</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
