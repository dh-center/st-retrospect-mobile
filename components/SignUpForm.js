import React, { Component } from 'react';
import {Container, Content, Form, Item, Input, Button, StyleProvider} from 'native-base';
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';
import { AsyncStorage }from 'react-native';

const signUpUrl = 'https://api.st-retrospect.dh-center.ru/sign-up';


export default class SignUpForm extends Component {
    static navigationOptions = {
        title: 'Sign Up',
    };
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    };
    onSignUp() {
        const { username, password } = this.state;
        fetch(
            signUpUrl,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        )
            .then((response) => {
                if (response.status == 201) {
                    console.log('OK');
                    this.props.navigation.navigate('LogIn');
                }
                else {
                    console.log(response.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Content>
                        <Form>
                            <Item>
                                <Input placeholder="Username" onChangeText={(username) => this.setState({ username })} />
                            </Item>
                            <Item>
                                <Input placeholder="Password" onChangeText={(password) => this.setState({ password })} />
                            </Item>
                            <Item last>
                                <Input placeholder="Password once again" />
                            </Item>
                            <Button
                                title="Sign Up"
                                onPress={this.onSignUp.bind(this)}
                            />
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        );
    };
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

}
