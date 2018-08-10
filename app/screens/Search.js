import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
//library imports
import EStyleSheet from 'react-native-extended-stylesheet';
import {ButtonGroup} from 'react-native-elements';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { Button, Container, Header, Content, Left, Form, Item, Picker, Label } from 'native-base'
//custom components imports 
import MultiSelect from 'react-native-multiple-select';
import Result from '../screens/searchResult';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      selectedIndex1: 0,
      selectedIndex2: 0,
      selectedIndex3: 0,
      selectedIndex4: 0,
      selectedIndex5: 1,
      selectedIndex6: 0,
      selectedItems: [],
      data: [],
      userKey: '',
      locality: [],
    };
    this.updateIndex1 = this.updateIndex1.bind(this)
    this.updateIndex2 = this.updateIndex2.bind(this)
    this.updateIndex3 = this.updateIndex3.bind(this)
    this.updateIndex4 = this.updateIndex4.bind(this)
    this.updateIndex5 = this.updateIndex5.bind(this)
    this.updateIndex6 = this.updateIndex6.bind(this)
    this.fetchData = this.fetchData.bind(this);
  }

  updateIndex1(selectedIndex1) {
    this.setState({selectedIndex1})
  }

  updateIndex2(selectedIndex2) {
    this.setState({selectedIndex2})
  }

  updateIndex3(selectedIndex3) {
    this.setState({selectedIndex3})
  }

  updateIndex4(selectedIndex4) {
    this.setState({selectedIndex4})
  }

  updateIndex5(selectedIndex5) {
    this.setState({selectedIndex5})
  }

  updateIndex6(selectedIndex6) {
    this.setState({selectedIndex6})
  }

  data = () => {
    if(this.state.selectedIndex2==0){
      return(
        <Form>
        <ButtonGroup
          onPress={this.updateIndex3}
          selectedIndex={this.state.selectedIndex3}
          buttons={['Flat','House/Villa','Plot']}
          containerStyle={{height: 45}}
        />
        <Label>Bedroom:</Label>
        <ButtonGroup
          onPress={this.updateIndex4}
          selectedIndex={this.state.selectedIndex4}
          buttons={['1','2','3','>3']}
          containerStyle={{height: 45}}
        />
        </Form>
      )
    }
    if(this.state.selectedIndex2==1){
      return(
        <Form>
          <ButtonGroup
          onPress={this.updateIndex5}
          selectedIndex={this.state.selectedIndex5}
          buttons={['Office','Shop/Showroom','Other Commercial']}
          containerStyle={{height: 45}}
        />
        <ButtonGroup
          onPress={this.updateIndex6}
          selectedIndex={this.state.selectedIndex6}
          buttons={['Furnished','Semi Furnished','Unfurnished']}
          containerStyle={{height: 45}}
        /> 
        </Form>
      )
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  fetchData = () => {
    let data = this.state.data;
    let hash = {}
    let tar = []
    let id = 0;
    axios.get('https://owbro.com/RestAPI/loadlocalities?locality_id=')
    .then( res => {
      this.state.data = res.data;
      let ar = this.state.data['Locality'];
      for(a in ar){
        hash = { id: id, name: ar[a]['areaname']}
        id = id + 1;
        tar.push(hash);
      }
      this.setState({data: tar})
    })
    .catch( function(error){
      console.log(error);
  });
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  fetchResult = () => {
    let l_id = this.state.selectedItems;
    let locality = this.state.data;
    let loc = '';
    for(i in l_id){
      let id = l_id[i];
      loc=loc+locality[id]['name']+",";
    }
    console.log(loc);
    
    let listingtype = '';
    if(this.state.selectedIndex1 == 1){
      listingtype = 'Rent'
    }
    else if(this.state.selectedIndex1 == 0){
      listingtype = 'Sell'
    }
    console.log(listingtype);

    let bedroom = 0;
    bedroom = this.state.selectedIndex4 + 1;
    console.log(bedroom);


    this.props.navigation.navigate('Result',{
      locality: loc,
      listing: listingtype,
      bed: bedroom
    })
  }
  render() {
    this.fetchData();
      let navigation = this.props.navigation;
      const buttons1 = ['Sell', 'Rent'];
      const buttons2 = ['Residential','Commercial'];
      const buttons3 = ['Flat','House/Villa','Plot'];
      const buttons4 = ['1','2','3','>3'];
      const {selectedIndex1} = this.state;
      const {selectedIndex2} = this.state;
      const {selectedIndex3} = this.state;
      const {selectedIndex4} = this.state;
      const { selectedItems } = this.state;
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
        <Label>Search..</Label>
        {/* <View style={styles.container}>  */}
        <MultiSelect
          hideTags
          items={this.state.data}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#ED1E4C"
          tagTextColor="#CCC"
          selectedItemTextColor="#ED1E4C"
          selectedItemIconColor="#ED1E4C"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#ED1E4C' }}
          submitButtonColor="#ED1E4C"
          submitButtonText="Submit"
        />
        {/* </View> */}
        <Form>
        <ButtonGroup
          onPress={this.updateIndex1}
          selectedIndex={selectedIndex1}
          buttons={buttons1}
          containerStyle={{height: 45}}
        />
        <ButtonGroup
          onPress={this.updateIndex2}
          selectedIndex={selectedIndex2}
          buttons={buttons2}
          containerStyle={{height: 45}}
        />
      {this.data()}
      </Form>
      <Button block style={styles.button1} onPress={this.fetchResult}>
        <Text style={{fontWeight: "700"}}>Search</Text>
      </Button>
      </Container>
      
    )
  }

}

export default Search;


const styles = EStyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#ED1E4C',
    margin:5
  },
  button1:{
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 350,
    height: 45,
    padding: 10,
    marginLeft: 7,
    marginTop: 15,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10
},
});