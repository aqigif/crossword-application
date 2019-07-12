import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  AsyncStorage,
  ProgressBarAndroid
} from "react-native";
import { Icon } from "react-native-elements";
import { Right,Left,Header } from "native-base";
import { Menu, MenuOption , MenuOptions , MenuTrigger } from 'react-native-popup-menu';
import {withNavigation} from 'react-navigation';
const axios = require('axios');
import configs from '../../../config'

class ProfileScreen extends Component {

    static navigationOptions  =  ({ navigation }) =>   {
        return {
        header: null
        }
      }

    render(){
        return(
            <View>
            <ScrollView>
                <View>
                    <Image style={styles.ImgBackground} source={{uri : 'https://cache.desktopnexus.com/thumbseg/729/729948-bigthumbnail.jpg'}} />
                    <View style={styles.AvatarContainer}>
                    <View style={styles.AvatarBorder}>
                    <Image style={styles.Avatar} source={{uri : 'https://i.pinimg.com/736x/de/bb/49/debb490d56b2dcfe3bb9d2cb1f32820c--pewdiepie-hd-wallpaper.jpg'}} />
                    </View>
                    </View>
                </View>
                <View style={styles.Title}>
                    <Text style={{fontSize:30}}>Feri Osas</Text>
                    <Text style={{fontSize:15,alignSelf:'center'}}>beginer</Text>
                </View>
                <View style={styles.ContentContainer}>
                    <View style={styles.TitleName}>
                    <Text style={{fontSize:20,fontWeight:'bold',marginLeft:-10,marginTop:10}}>Your Progres</Text>
                    <View style={styles.container}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>Level Dunia Hewan</Text>
                        <ProgressBarAndroid
                        styleAttr="Horizontal"
                        style={{width:200,}}
                        indeterminate={false}
                        progress={0.1}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>Level Dunia Buah</Text>
                        <ProgressBarAndroid
                        styleAttr="Horizontal"
                        style={{width:200,}}
                        indeterminate={false}
                        progress={0.5}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>Level Dunia Makanan</Text>
                        <ProgressBarAndroid
                        styleAttr="Horizontal"
                        style={{width:200,}}
                        indeterminate={false}
                        progress={0.9}
                        />
                    </View>
                    <TouchableOpacity onPress={()=> alert("apa anda yakin?")}>
                    <Text style={{fontSize:20,fontWeight:'bold',marginLeft:-10,marginTop:10, marginBottom:10}}>Reset Point</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View  style={styles.Back}>
                    <TouchableOpacity>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Back to game</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
  ImgBackground : {
      width: '100%',
      height:200,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  },
  Avatar : {
      alignSelf:'center',
      marginTop:5,
      width: 150,
      height: 150,
      borderRadius: 100
    },
  AvatarBorder : {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: 'cyan'
  },
  AvatarContainer : {
      top: -100
  },
  ContentContainer : {
      top: -100,
      borderRadius: 10,
      backgroundColor: 'white',
      margin: 10,
      height: 250,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
  },
  Title : {
    fontSize:30,
    top:-100,
    alignSelf:'center'
  },
  TitleName : {
      
      alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  Back:{
      margin:20,
      marginTop:-90,
  }

});
