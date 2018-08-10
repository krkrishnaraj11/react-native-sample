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
    var uKey;
    try {
      AsyncStorage.getItem('key').then((userKey) =>{
        uKey = JSON.parse(userKey);
        for(i in uKey){
          if(uKey[i] == 'ok'){
            this.setState({signedIn: true});
          }
        }
      })
      // console.log(uKey);
      // for(i in uKey){
      //   if(uKey[i]=='ok'){
      //     this.setState({signedIn: true});
      //   }
      // }
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
