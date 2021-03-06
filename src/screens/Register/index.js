import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
AsyncStorage,
Alert,
StatusBar,
ScrollView,
Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigation} from 'react-navigation';

import { Spinner } from 'native-base';
import configs from '../../../config';
const axios = require('axios');

import * as actionCrosswords from '../../redux/action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';


class Register extends Component {
    constructor(){
        super()

        this.state={
            inputEmail:"",
            inputPassword:"",
            inputUsername: "",
            icEye: 'visibility-off',
            showPassword: true,
            isLoading:false
        }


    }
    changePwdType = () => {
      let newState;
      if (this.state.showPassword) {
          newState = {
              icEye: 'visibility',
              showPassword: false,
              password: this.state.inputPassword
          }
      } else {
          newState = {
              icEye: 'visibility-off',
              showPassword: true,
              password: this.state.inputPassword
          }
      }
      this.setState(newState)
  };
  handlePassword = (password) => {
      let newState = {
          icEye: this.state.icEye,
          showPassword: this.state.showPassword,
          password: password
      }
      this.setState(newState);
      this.props.callback(password)
  };


  handleRegister = async () => {
    if( this.state.inputUsername=="" || this.state.inputEmail=="" || this.state.inputPassword=="") {
      alert("Lengkapi Form Terlebih dahulu")  
    }else{ 
      this.setState({isLoading:false})
      register = await this.props.register({ username: this.state.inputUsername, email: this.state.inputEmail, password: this.state.inputPassword })
      console.log(register)
      if (register){
        this.setState({isLoading:false})
        alert('Success Membuat Akun, Silahkan Login')
        this.props.navigation.navigate('Login')
      }
  }

  }

render(){
  const { navigate } = this.props.navigation;
  return(
    (this.state.isLoading==true) 
    ? 
    <View style={{flexGrow: 1,justifyContent:'center',alignItems: 'center'}}> 
<StatusBar  barStyle='dark-content' backgroundColor="#f2fcfe" translucent = {false} />
      <Spinner color='#517da2' style={{justifyContent:"center"}} />
      <Text>Loading . . .</Text>
    </View>
    :
  <View style={styles.container}>
   <LinearGradient colors={['#f2fcfe','#1c92d2']} style={{flex:1,width:"100%",
  justifyContent:"center",
  flexDirection:"column",
  alignItems:"center",}} >
<StatusBar  barStyle='dark-content' backgroundColor="#f2fcfe" translucent = {false} />
  <View style={styles.wrapperForm} >
  <Image source={require('../../assets/img/logo.png')} style={{resizeMode:"contain",width:80,height:80}} />
    <Text style={styles.title}>REGISTER NEW ACCOUNT</Text>
    <View style={styles.inputBox} >
    <TextInput 
        value={this.state.inputUsername}
        placeholder="Masukan Username Anda"
        placeholderTextColor = "grey"
        returnKeyType = {"next"}
        autoFocus = {true}
        onSubmitEditing={() => { this.secondTextInput }}
        onChangeText={(text)=>this.setState({
            inputUsername:text
        })}
    />
    <Icon 
        style={{position:"absolute",left:12,top:15}}
        name="person"
        size={16}
        color="rgba(0,0,0,0.5)"
    />
    </View>
    <View style={styles.inputBox} >
    <TextInput 
        value={this.state.inputEmail}
        placeholder="Masukan Email Anda"
        placeholderTextColor = "grey"
        returnKeyType = {"next"}
        onSubmitEditing={() => { this.secondTextInput }}
        onChangeText={(text)=>this.setState({
            inputEmail:text
        })}
    />
    <Icon 
        style={{position:"absolute",left:12,top:15}}
        name="email"
        size={16}
        color="rgba(0,0,0,0.5)"
    />
    </View>
    <View style={[styles.wrapperInputPassword, styles.inputBox]} >
    <TextInput
        value={this.state.inputPassword}
        placeholder="Masukan Password Anda"
        secureTextEntry={this.state.showPassword}
        ref={(input) => { this.secondTextInput = input; }}
        returnKeyType = {"go"}
        placeholderTextColor = "grey"
        onChangeText={(text)=>this.setState({
            inputPassword:text
        })}
    />
    <Icon 
        style={{position:"absolute",left:12,top:15}}
        name="lock"
        size={16}
        color="rgba(0,0,0,0.5)"
    />
    <Icon 
        style={styles.icon}
        name={this.state.icEye}
        size={25}
        color={componentColors.password_icon_color}
        onPress={this.changePwdType}
    />
    </View>

    <TouchableOpacity 
      style={styles.button}
      onPress={this.handleRegister}>
      <Text style={styles.buttonText}>DAFTAR</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      
      onPress={()=>navigate('Login')}>
      <Text style={{fontWeight:"bold",color:"#f2fcfe",bottom:-10}}>Kembali Ke Login</Text>
    </TouchableOpacity>



</View>
</LinearGradient>
</View>

)}
}

const mapStateToProps = state => {
  return {
    crosswords: state.crosswords
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (value) => dispatch(actionCrosswords.register(value))
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Register));

const styles = StyleSheet.create({
container : {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
},
title:{
  fontSize:20,
  fontWeight:"700",
  color:"#1c313a",
  margin:10,

},
inputBox: {
    width:"90%",
    borderRadius: 25,
    paddingHorizontal:16,
    paddingLeft:30,
    fontSize:16,
    color:'grey',
    marginVertical: 10,
    backgroundColor:"rgba(211, 235, 248, 1)",
    
},
wrapperForm:{
  width:"100%",
  backgroundColor:'rgba(86,130,163,0)',
  flexDirection:"column",
  alignItems:"center",
  borderRadius:20,
  padding:10,

},
wrapperInputPassword:{
  flexDirection:"row",
},
icon: {
  position: 'absolute',
  top: 11,
  right: 15
},
button: {
    width:"90%",
    backgroundColor:'#517da2',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
},
buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
}

});

export const componentColors = {
  password_icon_color:'#aeaeae',
};
