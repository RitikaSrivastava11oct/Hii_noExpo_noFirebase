import React ,{ Component } from "react";
import { View, Image, Text ,ScrollView , Platform} from "react-native";
import {  contactApi } from "./contactApi";
import { styles, themeColor } from '../../utils/style';
import { Icon } from "react-native-elements";
import { Linking } from 'react-native'

class ContactComponent extends Component{
    constructor( props ){
        super(props);
        this.state = {
            contactAddress : '',
            contactPhone : '',
            contactEmail : '',
        }
    }

    async componentDidMount(){
        try {
            let status = await contactApi.getContactDetails();
            if(status.result){
                this.setState({contactAddress : status.results.address , 
                    contactPhone : status.results.phone , 
                    contactEmail : status.results.email})
            }  
        } catch (error) {
            console.log(error);
        }
    }
    static navigationOptions = {
        title : 'Contact Us'
    }

    render(){
        return(
                <View style = {styles.contactView}>
                    <ScrollView>
                        <View>
                            <View style={styles.contactViewTop}>
                                <Text style={styles.contactText } >
                                    GET IN TOUCH
                                </Text>
                            </View>
                            <View style= {styles.contactView1}> 
                                <View style={styles.contView1}>
                                    <View style = {styles.contView2}>
                                        <View style={styles.circleIcon }>
                                            <Icon 
                                                type="font-awesome" 
                                                name="circle" 
                                                color={themeColor} 
                                                size={64} />
                                            <Icon
                                                name = 'home'
                                                type = 'font-awesome'
                                                size= {38}
                                                color = '#FFFFFF'
                                                containerStyle={{ position: 'absolute' }}
                                            />
                                        </View>
                                    </View>

                                    <View style = {styles.contView3}>
                                        <Text style={styles.contactText1} >
                                            {this.state.contactAddress.text1}
                                        </Text>
                                        <Text style={styles.contactText2} >
                                            {this.state.contactAddress.text2}
                                        </Text>
                                        
                                        <Text style={styles.contactText3} >
                                            {this.state.contactAddress.text3}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactAddress.text4}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactAddress.text5}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style= {styles.contactView1}> 
                                <View style={styles.contView1}>
                                    <View style = {styles.contView2}>
                                        <View style={styles.circleIcon}>
                                            <Icon 
                                                type="font-awesome" 
                                                name="circle" 
                                                color={themeColor}
                                                size={64} />
                                            <Icon
                                                name = 'phone'
                                                type = 'font-awesome'
                                                size= {30}
                                                color = '#FFFFFF'
                                                onPress = {() => {Platform.OS === 'ios'? Linking.openURL('telprompt:${9451275039}'):Linking.openURL('tel:${9451275039}') }}
                                                containerStyle={{ position: 'absolute' }}
                                                />
                                        </View>
                                    </View>
                                    <View style = {styles.contView3}>
                                        <Text style={styles.contactText1} >
                                            {this.state.contactPhone.text1}
                                        </Text>
                                        <Text style={styles.contactText2} >
                                            {this.state.contactPhone.text2}
                                        </Text>
                                        
                                        <Text style={styles.contactText3} >
                                            {this.state.contactPhone.text3}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactPhone.text4}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactPhone.text5}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style= {styles.contactView1}>       
                                <View style={styles.contView1}>
                                    <View style = {styles.contView2}>
                                        <View style={styles.circleIcon}>
                                            <Icon 
                                                type="font-awesome" 
                                                name="circle" 
                                                color={themeColor} 
                                                size={64} />
                                            <Icon
                                                name = 'inbox'
                                                type = 'font-awesome'
                                                size= {30}
                                                color = '#FFFFFF'
                                                onPress={() => Linking.openURL('mailto:hunarinindia@gmail.com?subject=Hunar In India&body=welcome to Hunar In India') }
                                                containerStyle={{ position: 'absolute' }}
                                                />
                                        </View>
                                    </View>
                                    <View style = {styles.contView3}>
                                        <Text style={styles.contactText1} >
                                            {this.state.contactEmail.text1}
                                        </Text>
                                        <Text style={styles.contactText2} >
                                            {this.state.contactEmail.text2}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactEmail.text3}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactEmail.text4}
                                        </Text>
                                        <Text style={styles.contactText3} >
                                            {this.state.contactEmail.text5}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
        );
    }
}

export default ContactComponent;