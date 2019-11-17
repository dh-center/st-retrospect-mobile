import React, { Component } from 'react';
import {Container, Content, Form, Item, Input, Button, StyleProvider, Header, Body, Title, Text} from 'native-base';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {sendLogInRequest, sendSignUpRequest} from '../../services/api/requests';
import {store} from '../../data/users/store';
import {SAVE_AUTH_TOKEN} from '../../data/users/action_types';


export default class SignUpForm extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <StyleProvider  style={getTheme(commonColor)}>
                <Header>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                </Header>
            </StyleProvider>
        )
    });
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordCheck: '',
        };
    };
    onSignUp() {
        const { username, password, passwordCheck } = this.state;
        if (username && password && (password == passwordCheck)) {
            sendSignUpRequest(username, password).then(
                (status) => {
                    if (status=='Err'){
                        alert("User already exists. Please try again.")
                    }
                    else if (status=='OK'){
                        sendLogInRequest(username, password).then(
                            (result) => {
                                store.dispatch({type: SAVE_AUTH_TOKEN, authToken: result.data.accessToken});
                                this.props.navigation.navigate('App');
                            }
                        );
                    }
                }
            );
        }
        else {
            console.error("No match");
        }
    }

    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Content>
                        <Form>
                            <Item>
                                <Input
                                    placeholder="Username"
                                    onChangeText={(username) => this.setState({ username })}
                                />
                            </Item>
                            <Item>
                                <Input
                                    placeholder="Password"
                                    onChangeText={(password) => this.setState({ password })}
                                    secureTextEntry={true}
                                />
                            </Item>
                            <Item>
                                <Input
                                    placeholder="Password once again"
                                    onChangeText={(passwordCheck) => this.setState({ passwordCheck })}
                                    secureTextEntry={true}
                                />
                            </Item>
                            <Button
                                title="Sign Up"
                                onPress={this.onSignUp.bind(this)}
                                primary block
                                style={{margin: 10}}
                            >
                                <Text>Sign Up</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        );
    };
}
