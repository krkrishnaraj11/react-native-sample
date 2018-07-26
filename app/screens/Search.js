import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, Image, Text, View, ActivityIndicator, TouchableOpacity ,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import axios from "axios";
import {AsyncStorage} from 'react-native';

let a=0;
export default class Search extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            showProgress: false,
            otp: '',
        };
    }
    handleLoginSucess = () => {
        const navigation = this.props.navigation;
        let { params } = this.props.navigation.state;
        let n = params ? params.phone : null;
        let lgnkey = '';
        axios.get('https://owbro.com/RestAPI/validatelogin?brokermobile='+n+'&otp='+this.state.otp)
        .then( res => {
            ar = res.data;
            for(var i in ar)
            {
                if(i == "loginkey"){
                    AsyncStorage.setItem('loginkey', ar[i]);
                    console.log(ar[i]);
                    console.log("login");}
                if(i == 0){
                    this.props.navigation.navigate('Drawer');}
                else if(i == -1)
                    alert(ar[i]);
            }
        })
        .catch( function(error){
            alert(error);
        });
    }
    handleOTP = () => {
        a = a + 1;
        if(a==4) {
            a=0;
            this.setState({showProgress: true});
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
        <Image
            source={require('../assets/img.png')}
        />
        <TextInput
            keyboardType='numeric'
            style={styles.input}
            maxLength={4}
            onChangeText={(Text) => this.setState({otp:Text})}
            value={this.state.otp}
        />

        <Button
            style={{ paddingBottom: 50}}
            title="SEARCH"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.button1}
            containerStyle={{ marginTop: 20 }}
            onPressIn={this.handleLoginSucess}
        />

        <ActivityIndicator 
            size='large'
            animating={this.state.showProgress}
        />
    </View>
        )
    }

}

EStyleSheet.build({
    $primaryBlue: '#4F6D7A',
    
    $white: '#FFFFFF',
    $lightGray: '#F0F0F0',
    $border: '#979797',
    $inputText: '#ED1E4C',
    });
    const styles = EStyleSheet.create({
        image:{
            justifyContent: 'center',
            marginTop: 30
        },
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: EStyleSheet.value('$inputText'),
        },
        welcome: {
            fontSize: 30,
            color:'$white',
            marginTop: 40
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
        button1:{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10
        },
        input: {
            fontSize: 30,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '$inputText',
            width: 250,
            height: 55,
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: '$white'
        },
        button: {
            backgroundColor: '$inputText',
            borderRadius: 20,
            padding: 10,
            marginBottom: 20,
            shadowColor: '$inputText',
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
            shadowOpacity: 0.35,
          },
    });
