import React, { Component } from 'react';
import {Container, Content, Form, Item, Input, Button, Header} from 'native-base';


export default class SignUpForm extends Component {
    static navigationOptions = {
        title: 'Log In',
    };
    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item>
                            <Input placeholder="Password" />
                        </Item>
                        <Button
                            title="Log In"
                            onPress={() => this.props.navigation.navigate('RoutesList')}
                        />
                    </Form>
                </Content>
            </Container>
        );
    }
}

