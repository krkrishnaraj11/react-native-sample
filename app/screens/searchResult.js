import React, { Component } from 'react';
import { Container, Header, Content, Card, Icon, CardItem, Text, Body, View, Left, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import axios from "axios";
export default class Result extends Component {
  constructor(props){
    super(props);
    this.state = {
      userKey: ''
    }
    this.fetchUserKey = this.fetchUserKey.bind(this);
  }
    fetchUserKey = () => {
      let uk;
      AsyncStorage.getItem('key').then((userKey) =>{
        uk = JSON.parse(userKey);
        this.setState({userKey: uk['loginkey']});
      })
    }

    fetchJSON = () => {
      let userkey = this.state.userKey;
      let { params } = this.props.navigation.state;
      let local = params ? params.locality : null;
      let listingtype = params ? params.listing : null;
      let bedroom = params ? params.bed : null;
      axios.get('https://owbro.com/RestAPI/owbrosearch?userkey='+userkey+'&area_unit=SQFT&main_cat=1&max_size=&start_date=&incentive_given=&facingtxt2=&isactive=1&lease_end_date=&category_id=3&enteredby=&max_floor=&end_date=&facingtxt1=&listingtype='+listingtype+'&propfurnish=&number_bedroom='+bedroom+'&min_size=&min_floor=&app_version=3.2.3(17)&lease_start_date=&area='+local)
      .then( res => {
        console.log(res);
      })
    }
  render() {
    this.fetchUserKey();
    this.fetchJSON();
    let navigation = this.props.navigation;
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
        <Content>
            <Card>
        <CardItem header style={{backgroundColor: '#112211'}}>
          <Text style={{color:'red'}}>Alaravali Apartment, Alaknanda</Text>
        </CardItem>
        <CardItem>
          <Body>
          <Button rounded light>
            <Text>23</Text>
          </Button>
          <Text style={{paddingLeft: 60}}>sdg, asg, asfjkgaksfhskfk oisfhsdil gioshbv,
              asdsasdfwd
              fas;
              sdfsdvsdg
          </Text>
          </Body>
        </CardItem>
        <CardItem footer>
        <Button transparent style={{paddingLeft: 10}}>
                  <Icon active name="call" />
        </Button>
        <Button transparent style={{paddingLeft: 20}}>
                  <Icon active name="ios-star-outline" />
        </Button>
        <Button transparent style={{paddingLeft: 30}}>
                  <Icon active name="ios-information-circle" />
        </Button>
        <Button transparent style={{paddingLeft: 50}}>
                  <Icon active name="ios-share" />
        </Button>
        </CardItem>
     </Card>
        </Content>
      </Container>
    );
  }
}