import React, { Component } from 'react';
import {Container, Content, Form, Item, Input, Button, Header, Text, StyleProvider} from 'native-base';
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';


const logInUrl = 'https://api.st-retrospect.dh-center.ru/login';


export default class SignUpForm extends Component {
    static navigationOptions = {
        title: 'Log In',
    };
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    };
    onLogIn() {
        const {username, password} = this.state;
        const encodedUsername= encodeURIComponent(username);
        const encodedPassword= encodeURIComponent(password);
        const parmsUrl = logInUrl+`?username=${encodedUsername}&password=${encodedPassword}`;
        console.log(parmsUrl);
        fetch(parmsUrl)
            .then((response) => {
                if (response.status == 200) {
                    console.log('OK');
                    this.props.navigation.navigate('App');
                }
                else {
                    console.log(response.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
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
                            <Button
                                title="Log In"
                                onPress={this.onLogIn.bind(this)}>
                                <Text>
                                    Log In
                                </Text>
                            </Button>
                        </Form>
                        <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

