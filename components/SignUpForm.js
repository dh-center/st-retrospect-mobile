import React, { Component } from 'react';
import AppHeader from './AppHeader';
import {Container, Content, Form, Item, Input, Left, Button, Icon, Body, Title, Right, Header} from 'native-base';


export default class SignUpForm extends Component {
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
                        <Item last>
                            <Input placeholder="Password once again" />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}
