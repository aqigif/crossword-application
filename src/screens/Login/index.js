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
Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Spinner } from 'native-base';
import configs from '../../../config'

import * as actionCrosswords from '../../redux/action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
    constructor(){
        super()
        this.state={
            inputEmail:"",
            inputPassword:"",
            icEye: 'visibility-off',
            showPassword: true,
            showLogo:true,
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

    handleLogin = async () => {
      if( this.state.inputEmail=="" || this.state.inputPassword=="") {
        alert("Lengkapi Form Terlebih dahulu")  
      }else{ 
        await this.props.login({ email: this.state.inputEmail, password: this.state.inputPassword })
        if(this.props.auth.saveToken!=null){
          console.log(this.props.auth.saveToken)
          this.props.navigation.navigate('Home')
        }  
    }
  }

render(){
  console.log(this.props.auth.saveToken)
  const field = this.props.auth.field
  return(
    (this.props.auth.isLoading===true) 
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
  {(this.state.showLogo===true) ? 
    <Image source={require('../../assets/img/logo.png')} style={{resizeMode:"contain",width:80,height:80}} /> : null}
     <Text style={styles.title}>CROSSWORD GAME</Text>
    <View style={styles.inputBox} >
    <TextInput 
        value={this.state.inputEmail}
        placeholder="Masukan Email Anda"
        placeholderTextColor = "grey"
        returnKeyType = {"next"}
        autoFocus = {true}
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
    {field=="email"?
    (<Text style={{color:'red'}}>Your email wasn't registered, let's sign up!</Text>):(<View/>)}
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
    {field=="password"?
    (<Text style={{color:'red'}}>Your password was wrong!</Text>):(<View/>)}

    <TouchableOpacity 
      style={styles.button}
      onPress={this.handleLogin}>
      <Text style={styles.buttonText}>MASUK</Text>
    </TouchableOpacity>
    
</View>
  <View style={{justifyContent:'center',alignItems: 'center',bottom:-20}}>
      <Text style={{fontWeight:"bold"}} >Belum Mempunyai Akun ?</Text>
    <TouchableOpacity>
      <Text 
        onPress={()=>this.props.navigation.navigate('Register')}
        style={{color:"#f2fcfe",fontWeight:"bold"}} >DAFTAR SEKARANG!</Text>
    </TouchableOpacity>
</View>
</LinearGradient>
</View>

)}
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (value) => dispatch(actionCrosswords.login(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
container : {
  
    flex: 1,
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
  flexDirection:"column",
  alignItems:"center",
  
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
