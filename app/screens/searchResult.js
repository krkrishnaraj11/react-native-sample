import React, { Component } from 'react';
import { Container, Header, Content, Card, Icon, CardItem, Text, Body, View, Left, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
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
      console.log(this.state.userKey);
    }
  render() {
      this.fetchUserKey();
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