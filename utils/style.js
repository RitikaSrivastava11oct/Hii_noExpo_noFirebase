import { StyleSheet } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
const constants = {
  BODY_COLOR, TEXT_MUTED,
};

// custom classes
const classes = {
  title: {
    color: 'red',
  }
};

export const themeColor = '#524b38';
//export const themeColor = '#000000';
export const drawerBackgroundColor = '#D3D3D3';


export const themeColor1 = '#D3D3D3';
export const btnColor = '#A9A9A9';


const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
export const s = bootstrapStyleSheet.create();
// const c = constants = bootstrapStyleSheet.constants;

export const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1
        },
        bottomRight: {
            position: 'absolute',
            bottom: 3,
            right: 5,
        },
        formRow: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            margin: 20
        },
        row : {
            flex : 1,
            flexDirection : 'row',
            padding : 10,
            margin : 10
        },
        col : {
            flex : 1,
            padding : 2
        },
        formLabel: {
            fontSize: 18,
            flex: 2
        },
        formItem: {
            flex: 1,
            height: 30,
            borderColor: 'gray',
            borderWidth: 1 
        },
        modal: {
            justifyContent: 'center',
            margin: 30
        },
        modalTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: '#739c1a',
            textAlign: 'center',
            color: 'white',
            marginBottom: 20
        },
        modalText: {
            fontSize: 18,
            margin: 10
        },
        //added by Ritika
        container: {
            justifyContent: 'center',
            margin: 4,
        },
        formInput: {
            margin: 20
        },

        formButton: {
            margin: 17,
            marginLeft : 90,
            width : 100,
            height : 15,
            borderRadius:400,
            justifyContent : 'center'
        },
        formCheckbox: {
            margin: 20,
            backgroundColor: null
        },
        circleImage:{
            height: 50,
            width:50,
            borderRadius:500,
            flex : 1
        },
        circleImageContainer: {
            backgroundColor: '#fff'
        },
        ScrollImageCategory:{
            height: 80,
            width:70,
        },
        ScrollImageProducts:{
            height: 60,
            width:40,
        },
        ViewFavProducts:{
            height : 240 ,
            marginTop : 4,
            marginBottom : 2,
            backgroundColor: '#ecf0f1'
        },
        ViewFavCategory:{
            height : 220 ,
            marginTop : 4,
            marginBottom : 2
        },
        button : {
            height :10,
            width : 30,
        },
        contactView : {
            height : "100%",
             width : "100%",
             backgroundColor : '#D3D3D3',
             flex : 1,
             flexDirection :'column' ,
             justifyContent: 'space-evenly'
        },
        contactViewTop : {
            flex : 1 , 
            height : 20, 
            paddingBottom : 10,
            marginBottom : 20,
            marginTop : 20 ,
            width : "100%" ,
            justifyContent : 'center',
            alignItems : 'center'
        },
        contactView1 : {
            flex : 1 , 
            height : 150, 
            width : "100%" ,
            paddingLeft : 4,
            paddingTop : 4,
            paddingBottom : 4
            
        },
        circleIcon : {
            position: 'relative',
            justifyContent: 'center',
             alignItems: 'center'
        },
        contactText: {
            fontWeight: 'bold',
            fontSize: 27,
            color: "black" ,
            marginBottom : 10,
            flexDirection :'row',
            justifyContent : 'center',
            alignItems : 'center',
            marginTop : 29
        },
        contactText1: {
            fontWeight: 'bold',
            fontSize: 20,
            color: "black"
        },
        contactText2: {
            fontWeight: 'bold',
            color: "black" 
        },
        contactText3: {
            fontSize: 15,
            color: "black"
        },
        topRight: {
            position: 'absolute',
            top: 3,
            right: 3
        },
        bottomCenter: {
            position: 'absolute',
            bottom : 0,
            right : 0
        },
        footer : {
            backgroundColor : themeColor,
            height : 80
        },
        titleStyle :{
            fontSize : 17
        },
        shadow: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1},
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 1,
          },
          shadowText: { 
             borderWidth: 1,
             borderRadius: 5,
             borderColor: '#ddd',
             borderBottomWidth: 0,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1},
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 1,
          },
          container1: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap'
          },
          aboutView1 :{
            height : "100%",
            width : "100%"
        },
        aboutView2 :{ 
            marginTop : 10,
            marginBottom :10 , 
            marginLeft :5 ,
            marginRight : 5
        },
        cartView1 :{
            margin : 2,
            marginTop : 2 
        },
        cartView2 :{
            borderWidth : 1,
            borderColor: themeColor1,
            flexDirection : 'row'
        },
        cartView3 : {
            width : 135 , 
            height : 164 
        },
        cartView4 : { 
            flex : 1,
            height : 164  , 
            marginLeft : 30 , 
            marginTop : 12
        },
        cartText1 :{ 
            fontWeight: 'bold' ,
            fontSize : 14
        },
        cartText2 :{
            fontSize : 12,
            flexWrap :'wrap' 
        },
        cartText3 :{ 
            fontSize :15 , 
            color :'#B22222'
        },
        cartText4: {
            fontSize :15 ,
            color :themeColor,
            textDecorationLine : 'line-through',
             textDecorationStyle : 'solid'
        },
        cartText5 :{
             flexWrap :'wrap',
             fontSize : 14  ,
             color :themeColor 
        },
        catView1 :{
            width : 165,
            margin : 1, 
            marginTop : 1,
            height : 239,
            flexDirection : 'row' ,  
            alignItems : "stretch"
        },
        catView2 : { 
            paddingBottom : 3,
            paddingTop : 2,
            flexDirection : 'row', 
            flexWrap : 'wrap',
            justifyContent : 'space-evenly'
        },
        catView3 : {
            margin : 20
        },
        catText1 : { 
            fontSize : 11 , 
            fontWeight : 'bold'
        },
        catText2 : { 
            paddingBottom : 2,
            fontSize : 9 
        },
        contView1 :{ 
            flex :1, 
            flexDirection : 'row'
        },
        contView2 :{ 
            justifyContent : 'flex-start'
        },
        contView3 :{ 
            marginLeft : 20 , 
            paddingLeft : 20
        },
        


        

      
        
    });