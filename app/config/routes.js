import React from 'react';
import {View,
    Text,
    StyleSheet,
    ScrollView,
    Image} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Verify from '../screens/Verify';
import Login from '../screens/Login';
import Search from '../screens/Search';
import { Container, Content, Icon, Header, Body } from 'native-base'
import {AsyncStorage} from 'react-native';

console.log(AsyncStorage.getItem('key'));

const CustomDrawerContentComponent = (props) => (
    <Container>
      <Header style={styles.drawerHeader}>
        <Body>
          <Image
            style={styles.drawerImage}
            source={require('../assets/drawer.png')} />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
  
    </Container>
  
  );


export const Drawer = DrawerNavigator({
    Home: {
        screen: Search,
        navigationOptions:{
            title: 'Search',
            headerStyle: {
                backgroundColor: '#ED1E4C'
            }
        }
    },
    Settings: {
        screen: Verify,
    },
},
    {
        InitialRouteName: 'Home',
        drawerWidth: 250,
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
});


export const LoggedIn = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: () => null,
        }
    },
    Verify: {
        screen: Verify,
        navigationOptions: {
            title: 'Verify OTP',
        }
    },
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            title: 'Search',
            gesturesEnabled: false
        }
    }
})

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 200,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
    
    })
      