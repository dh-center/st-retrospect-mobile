import React, { Component } from 'react';
import {Container, Content, Form, Item, Input, Button, StyleProvider, Header, Body, Title, Text} from 'native-base';
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';
import { AsyncStorage }from 'react-native';

const signUpUrl = 'https://api.st-retrospect.dh-center.ru/sign-up';


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
                            <Button title="Sign Up" onPress={this.onSignUp.bind(this)}>
                                <Text>Sign Up</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        );
    };
}
