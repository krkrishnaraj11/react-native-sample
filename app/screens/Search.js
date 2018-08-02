import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
//library imports
import {ButtonGroup} from 'react-native-elements';
import { Button, Container, Header, Content, Left, Form, Item, Picker } from 'native-base'
//custom components imports 

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex})
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
      let navigation = this.props.navigation;
      const buttons1 = ['Sell', 'Rent'];
      const buttons2 = ['Residential','Commercial'];
      const { selectedIndex } = this.state
    return (
      <Container>
        <Header style={{color: '#ED1E4C'}}>
            <Left>
                <Icon
                    name='ios-menu'
                    type='ionicon'
                    size={25}
                    color={'#ED1E4C'}
                    onPress={() => navigation.openDrawer()}
                />
            </Left>
        </Header>

        <Form>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons1}
          containerStyle={{height: 45}}
        />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons2}
          containerStyle={{height: 45}}
        />
          <Item picker>
          <Picker
            mode="dropdown"
            iosHeader="Sell / Rent"
            iosIcon={<Icon name="ios-arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
            style={{ width: undefined }}
            placeholder="Rent/Sell"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}
          >
            <Picker.Item label="Sell" value="key0" />
            <Picker.Item label="Rent" value="key1" />
          </Picker>
        </Item>
      </Form>
      </Container>
    )
  }

}

export default Search;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});