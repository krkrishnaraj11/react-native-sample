import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, Image, Text, View, TouchableOpacity,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Verify from './Verify';
import { Button } from 'react-native-elements';
import axios from "axios";
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            num: '',
            ar: {}
        }
    }
    handleLoginSucess = () => {
        let n = this.state.num;
        let ar ={}
        axios.get('https://owbro.com/RestAPI/login?brokermobile='+n)
        .then( res => {
            ar = res.data;
            for(var i in ar)
            {
                if(i == 0)
                    this.props.navigation.navigate('Verify', {
                        phone: n
                    }
                );
                else
                alert(ar[i]);
            }
        })
        .catch( function(error){
            alert(error);
        });
    }
    render() {
        return(
            <View style={styles.container}>
        <Image
            source={require('../assets/img.png')}
            style={styles.image}
        />
        <TextInput
            keyboardType='numeric'
            style={styles.input}
            onChangeText={(num) => this.setState({num})}
            value={this.state.num}
        />
        <Button
            style={{ marginTop: 90}}
            title="Send OTP"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.button1}
            containerStyle={{ marginTop: 20 }}
            onPressIn={this.handleLoginSucess}
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
    button1:{
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10
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
      }
});