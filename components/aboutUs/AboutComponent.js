import React ,{ Component } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { Tile ,Icon} from 'react-native-elements';
import {  aboutApi } from "./aboutApi";
import { styles, themeColor } from '../../utils/style';

class AboutComponent extends Component{
    constructor( props ){
        super(props);
        this.state = {
            aboutDetails : '',
        }
    }

    async componentDidMount(){
        try {
            let results = await aboutApi.getAboutDetails();
            this.setState({aboutDetails : results})
        } catch (error) {
            console.log(error);
        }

    }
    static navigationOptions = {
        title : 'About Us'
    }
    
    render(){
        return(
            <View style = {styles.aboutView1}>
                <ScrollView>
                    <View style ={styles.aboutView2}>
                        <Text>
                            Hunar in India is mixture of our Indian culture and heritage.
                            {"\n"}
                            You will find here different varities of products ,
                            {"\n"}
                             all from different parts of
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default AboutComponent;