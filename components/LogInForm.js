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
    Grid,
    Row
} from 'native-base';
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';


const logInUrl = 'https://api.st-retrospect.dh-center.ru/login';


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
            accessToken: ''
        };
    };
    onLogIn() {
        const {username, password} = this.state;
        const encodedUsername= encodeURIComponent(username);
        const encodedPassword= encodeURIComponent(password);
        const parmsUrl = logInUrl+`?username=${encodedUsername}&password=${encodedPassword}`;

        fetch(parmsUrl)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({accessToken: responseData.data.accessToken});
                console.log(this.state.accessToken);
                this.props.navigation.navigate('App', {accessToken: this.state.accessToken});
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
                        <Form style={{margin: 10}}>
                            <Item>
                                <Input placeholder="Username" onChangeText={(username) => this.setState({ username })} />
                            </Item>
                            <Item>
                                <Input placeholder="Password" onChangeText={(password) => this.setState({ password })} />
                            </Item>
                            <Button
                                title="Log In"
                                onPress={this.onLogIn.bind(this)}
                                primary block
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

