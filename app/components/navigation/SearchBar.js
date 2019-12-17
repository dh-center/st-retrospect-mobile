import React, {Component} from 'react';
import {Button, Container, Header, Icon, Input, Item, Text} from 'native-base';
import SearchedRoutesList from '../../screens/app/SearchedRoutesList';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {query: ''};
    }
    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" />
                        <Input
                            placeholder="Search"
                            onChangeText={query => this.setState({query})}
                        />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <SearchedRoutesList query={this.state.query} />
            </Container>
        );
    }
}
