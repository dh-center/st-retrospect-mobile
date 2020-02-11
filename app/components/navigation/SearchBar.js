import React, {Component} from 'react';
import {Container, Header, Icon, Input, Item, Text} from 'native-base';
import SearchedRoutesList from '../../screens/app/SearchedRoutesList';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            duration: {
                hours: '',
                minutes: '',
            },
            durationValid: true,
        };
    }
    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item style={{flex: 2}}>
                        <Icon name="search" />
                        <Input
                            placeholder="Query"
                            onChangeText={query => this.setState({query})}
                        />
                    </Item>
                    <Item error={!this.state.durationValid}>
                        <Icon name="time" />
                        <Input
                            placeholder="HH"
                            value={this.state.durationHours}
                            onChangeText={durationHours =>
                                this.handleDurationChange({
                                    hours: durationHours,
                                    minutes: this.state.duration.minutes,
                                })
                            }
                            maxLength={2}
                            keyboardType={'numeric'}
                        />
                        <Text>:</Text>
                        <Input
                            placeholder="MM"
                            value={this.state.durationMinutes}
                            onChangeText={durationMinutes =>
                                this.handleDurationChange({
                                    hours: this.state.duration.hours,
                                    minutes: durationMinutes,
                                })
                            }
                            maxLength={2}
                            keyboardType={'numeric'}
                        />
                    </Item>
                </Header>
                <SearchedRoutesList
                    query={this.state.query}
                    duration={
                        this.state.durationValid
                            ? this.state.duration
                            : undefined
                    }
                />
            </Container>
        );
    }
    handleDurationChange(duration) {
        this.setState({duration});
        if (duration.hours >= 24 || duration.minutes >= 60) {
            this.setState({durationValid: false});
        } else {
            this.setState({durationValid: true});
        }
    }
}
