import React, { Component } from 'react';
import {Container, Content, Form, Item, Input, Button, Header} from 'native-base';


export default class SignUpForm extends Component {
    static navigationOptions = {
        title: 'Sign Up',
    };
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item>
                            <Input placeholder="Password" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password once again" />
                        </Item>
                        <Button
                            title="Sign Up"
                            onPress={() => this.props.navigation.navigate('App')}
                        />
                    </Form>
                </Content>
            </Container>
        );
    }
}
