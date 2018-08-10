import React, {Component} from 'react';
import CustomMultiPicker from "../config/MultipleSelect";
import {Container, Header, Left, Icon, Content} from 'native-base';
export default class Sample extends Component {
    constructor(props){
        super(props);
        this.state = {
            userKEY: ''
        }
    }

    
    render() {
        let navigation = this.props.navigation;
        let userList = {
            "123":"Tom",
            "124":"Michael",
            "125":"Christin"
          }
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
                    <CustomMultiPicker
                    options={userList}
                    search={true} // should show search bar?
                    multiple={true} //
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} // label or value
                    callback={(res)=>{ console.log(res) }} // callback, array of selected items
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle-outline"}
                    unselectedIconName={"ios-radio-button-off-outline"}
                    scrollViewHeight={130}
                    selected={[1,2]} // list of options which are selected by default
                    />                  
                </Content>
            </Container>
        );
    }
}
