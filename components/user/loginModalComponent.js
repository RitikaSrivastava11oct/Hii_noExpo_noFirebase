
import { styles, s, themeColor1, themeColor , btnColor } from '../../utils/style';
import React, { Component } from 'react';
import { Text, View, FlatList, TextInput, Modal, ScrollView, Button, Platform,TouchableHighlight, TouchableOpacity ,Image} from 'react-native';
import { Input, CheckBox, Icon } from 'react-native-elements';
import { usersApi } from './usersApi';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            showSignupModal : false,
            firstName : '',
            lastName : '',
            username : '',
            password :'',
            emailId :'',
            address :'',
            contactNo :'',
            remember : true
         }
    }

    toggleSignupModal=()=>{
        this.setState({
            showSignupModal : !this.state.showSignupModal
        });
    } 
    handleLogin = async () => {
        let payload = {
            username : this.state.username,
            password:this.state.password 
        };
        let response = await usersApi.handleLogin(payload);
        if(response.result === true)   this.props.toggleModal();
        alert(response.message);
    };
    handleSignup = async () => {
        let payload = {firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        username : this.state.username,
                        password:this.state.password,
                        emailId:this.state.emailId,
                        address:this.state.address,
                        contactNo:this.state.contactNo    
        };
        let response = await usersApi.handleSignup(payload);
        if(response.result === true) 
        { 
            this.toggleSignupModal();
            this.props.toggleModal();
            alert(response.message + '.You need to login to continue');
        }  
        else
            alert(response.message );
        
    };

    render(){ 
        return (
            <View>
                
                <Modal   animationType={"slide"} transparent={false} visible={this.props.showModal}>
                        <View style={[s.modal]}>
                            <View style={[s.modalDialog]}>
                                
                                <View style={[s.modalContent] ,{ backgroundColor : '#fff9e6'}}> 
                                    <View style = {styles.topRight}>
                                    <Icon
                                        name = 'close'
                                        type = 'font-awesome'
                                        size = {22}
                                        onPress={() => { this.props.toggleModal() }}
                                        color = 'red'/>
                                    </View>
                                
                                    <View style={styles.container}>
                                        <View style = {{margin : 12}}>
                                                <Input
                                                placeholder=" Username"
                                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.username= text }
                                                />
                                        </View>
                                        <View style = {{margin : 12}}>    
                                            <Input
                                                placeholder=" Password"
                                                secureTextEntry={true}
                                                leftIcon={{ type: 'font-awesome', name: 'key' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.password= text }
                                                />
                                        </View>

                                        <View style = {{margin : 12}}>    
                                            <CheckBox title="Remember Me"
                                                center
                                                checked={this.state.remember}
                                                color = {themeColor}
                                                onPress={() => this.setState({remember: !this.state.remember})}
                                                containerStyle={styles.formCheckbox}
                                                />
                                        </View>

                                        <View style={styles.formButton}>
                                            <Button
                                                onPress={()=>{this.handleLogin()}}
                                                title="Login"
                                                color = {btnColor}
                                                />
                                        </View>
                                        <View style = {{ marginBottom : 10 , marginTop : 12}}>
                                            <Text>
                                                Don't have an account?
                                            </Text>
                                            <TouchableHighlight onPress={()=>{this.toggleSignupModal(); this.props.toggleModal()}} >
                                                <Text style ={{fontSize : 17, color : '#32CD32'}} >
                                                    Signup
                                                </Text>
                                            </TouchableHighlight>
                                        </View> 
                                    </View>
                                </View>
                            </View>
                        </View>  
                </Modal>
               
                
                <View>
                <Modal animationType={"slide"} transparent={false} visible={this.state.showSignupModal}>
                    
                        <View style={[s.modal]}>
                            <View style={[s.modalDialog]}>
                                <View style={[s.modalContent] ,{ backgroundColor : '#fff9e6'}}> 
                                <ScrollView>
                                    <View style = {styles.topRight}>
                                        <Icon
                                            name = 'close'
                                            type = 'font-awesome'
                                            size = {22}
                                            onPress={() => { this.toggleSignupModal() }}
                                            color = 'red'/>
                                    </View>
                                    <View style={styles.container}>
                                        <View style = {{margin : 12}}>
                                            <Input
                                                placeholder="Firstname"
                                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.firstName= text }
                                            />
                                        </View>
                                        <View style = {{margin : 12}}>
                                            <Input
                                                placeholder="Lastname"
                                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.lastName= text }
                                            />
                                        </View>
                                        <View style = {{margin : 12}}>
                                            <Input
                                                placeholder="Username"
                                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.username= text }
                                            />
                                        </View>
                                        <View style = {{margin : 12}}>    
                                            <Input
                                                placeholder="Password"
                                                secureTextEntry={true}
                                                leftIcon={{ type: 'font-awesome', name: 'key' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.password= text }
                                                />
                                        </View>
                                        <View style = {{margin : 12}}>
                                            <Input
                                                placeholder="EmailId"
                                                leftIcon={{ type: 'font-awesome', name: 'inbox' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.emailId= text }
                                            />
                                        </View>
                                        <View style = {{margin : 12}}>
                                            <Input
                                                placeholder="Address"
                                                multiline = {true}
                                                leftIcon={{ type: 'font-awesome', name: 'home' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.address= text }
                                            />
                                        </View>
                                        <View style = {{margin : 12}}>
                                            <Input
                                                placeholder="Contact no"
                                                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                                                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                                                onChangeText={text => this.state.contactNo= text }
                                            />
                                        </View>
                                        <View style={styles.formButton}>
                                            <Button
                                                onPress={() => {this.handleSignup()}}
                                                title="Signup"
                                                color = {btnColor}
                                                />
                                        </View>
                                    </View>
                                    </ScrollView>
                                </View>
                                
                            </View>
                        </View>
                    
                </Modal> 
                </View>
                
            </View>
        );
    }
}

export default Login;