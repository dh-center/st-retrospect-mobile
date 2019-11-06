import React, { Component } from 'react';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Header,
    Text,
    StyleProvider,
    Body,
    Title,

} from 'native-base';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import {sendLogInRequest} from '../../services/api/requests';


export default class SignUpForm extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <StyleProvider  style={getTheme(commonColor)}>
                <Header>
                    <Body>
                        <Title>Log In</Title>
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
    onLogIn() {
        const {username, password} = this.state;
        if (username && password) {
            sendLogInRequest(username, password);
            this.props.navigation.navigate('App');
        }
    };
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
                            <Button
                                title="Log In"
                                onPress={this.onLogIn.bind(this)}
                                primary block
                                style={{margin: 10}}
                            >
                                <Text>
                                    Log In
                                </Text>
                            </Button>
                        </Form>

                        <Button
                            title="Sign Up"
                            onPress={() => this.props.navigation.navigate('SignUp')}
                            bordered primary block
                            style={{margin: 10}}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

