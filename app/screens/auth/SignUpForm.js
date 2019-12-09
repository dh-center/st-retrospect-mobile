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
import {sendLogInRequest, sendSignUpRequest} from '../../services/api/requests';
import {store} from '../../redux/users/store';
import {SAVE_AUTH_TOKEN} from '../../redux/users/action_types';
import {t} from '../../locales/i18n';

export default class SignUpForm extends Component {
    static navigationOptions = ({navigation}) => ({
        header: (
            <StyleProvider style={getTheme(commonColor)}>
                <Header>
                    <Body>
                        <Title>{t('signup')}</Title>
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
            passwordCheck: '',
        };
    }
    onSignUp() {
        const {username, password, passwordCheck} = this.state;
        if (username && password && password == passwordCheck) {
            sendSignUpRequest(username, password).then(status => {
                if (status == 'Err') {
                    alert('User already exists. Please try again.');
                } else if (status == 'OK') {
                    sendLogInRequest(username, password).then(result => {
                        store.dispatch({
                            type: SAVE_AUTH_TOKEN,
                            authToken: result.data.accessToken,
                        });
                        this.props.navigation.navigate('App');
                    });
                }
            });
        } else {
            console.error('No match');
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
                            <Item>
                                <Input
                                    placeholder={t('repeat-password')}
                                    onChangeText={passwordCheck =>
                                        this.setState({passwordCheck})
                                    }
                                    secureTextEntry={true}
                                />
                            </Item>
                            <Button
                                title={t('signup')}
                                onPress={this.onSignUp.bind(this)}
                                primary
                                block
                                style={{margin: 10}}>
                                <Text>{t('signup')}</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
