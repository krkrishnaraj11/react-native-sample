import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {LoggedIn, Drawer} from './config/routes';
import {AsyncStorage} from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  retrieveData() {
    try {
      console.log('hi');
      var value = AsyncStorage.getItem('key');
      this.state.signedIn = true;
      // console.log(value);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  render() {
    this.retrieveData();
    if(this.state.signedIn == true)
      return <Drawer/>
    else if(this.state.signedIn == false)
      return <LoggedIn/>
  }
}
