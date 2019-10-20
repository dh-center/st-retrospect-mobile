import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AppHeader from './components/AppHeader'


const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.st-retrospect.dh-center.ru/graphql',
        headers: {
            "accept-language": "ru"
        }
    }),
    cache: new InMemoryCache()
});

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>

                <View style={styles.container}>
                    <AppHeader/>
                </View>
            </ApolloProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
