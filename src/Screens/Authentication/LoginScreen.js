import React, { Component } from 'react';
import { Platform,
  StyleSheet,
  Image,
  Text,
  Alert,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import{ OutlinedTextField} from 'react-native-material-textfield';
//import { StackActions, NavigationActions } from 'react-navigation';
//import Constants from '../../network/Constants';
import AppStrings from "../../Resource/AppStrings";
import { Utils,ResponsiveUtils } from "../../Helper"
//import {getFontSize, getLayoutSize} from "../Helper/ResponsiveUtils"

export default class LoginScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state={
      defaultNum : 1000,
      count : '',
      loading:false,
      password:'',
      passwordError:'',
      uname:'',
      unameError:'',
      username:'',
      usernameError:'',
      phoneNumber:'',
      phoneNumberError:''
    };
  }

  async componentDidMount() {

  }


  async Validation () {
    console.log(this.state.username);
    var iserror = false;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(Utils.isStringNull(this.state.username) || Utils.isStringNull(this.state.phoneNumber)){
      iserror = true;
      this.setState(() => ({ unameError: 'Please enter username / phone no.'}));
    }else if(format.test(this.state.username) && format.test(this.state.phoneNumber) ){
          iserror = true;
          this.setState(() => ({ unameError: 'Special characters are not allowed.'}));
    } else {
          iserror = false;
    }


    if (Utils.isStringNull(this.state.password)) {
         iserror = true;
         this.setState(() => ({ passwordError: 'Please enter password.'}));
       } else {
           if (this.state.password.length < 8) {
             iserror = true;
             this.setState(() => ({ passwordError: 'Password should be aleast 8 characters.'}));
           } else {
             this.setState(() => ({ passwordError: null}));
           }
       }

    if (!iserror) {
      const {username,phoneNumber,password} = this.state;
      try{
           let loginDetails = await AsyncStorage.getItem('loginDetails');
           let ld = JSON.parse(loginDetails);

           if (ld.username != null && ld.phoneNumber != null && ld.password != null){
               if (ld.username == username && ld.password == password){
                   alert('Go in!');
               }
               else{
                   alert('Username and Password does not exist!');
               }
           }
       }catch(error)  {
          alert(error);
        }
    //  alert('Login Succesfully!')
     //this.signUpApi();
    }
  }

  /*formatText = (text) => {
     text = text.replace(/[^A-Za-z0-9._-]/gi, "");
     this.setState({ uname: text })
     //console.log(" --->> "+ text);
     return text;
  };*/

  render() {
    return (
      <View style={styles.container}>


        <Text style={{fontSize:25,fontWeight:'bold',
              color:'#efa75b',textAlign:'center',marginTop:280}}>{AppStrings.welcome}</Text>


              <View style={{width:290,alignSelf:'center',marginTop:30,}}>
              <TextInput
                    style={{borderWidth: 1.5,borderRadius:6,paddingLeft:15,borderColor:'#C9C9C9',backgroundColor:'white'}}
                    placeholder={'Username / Phone No.'}
                    value={this.state.username || this.state.phoneNumber}
                    keyboardType="default"
                    onChangeText={(text) => this.setState({uname:text, unameError: null,username:text,phoneNumber:text})}
              />

              {!!this.state.unameError && (
                  <Text style={styles.errorText}>{this.state.unameError}</Text>
              )}

              </View>

              <View style={{width:290,alignSelf:'center',marginTop:10}}>
                <TextInput
                      style={{borderWidth: 1.5,borderRadius:6,paddingLeft:15,borderColor:'#C9C9C9',
                      backgroundColor:'white'}}
                      placeholder={'Password'}
                      value={this.state.password}
                      keyboardType="default"
                      onChangeText={(text) => this.setState({password:text, passwordError: null})}
                      secureTextEntry= {true}
                      onSubmitEditing={()=> this.Validation() }
                  />

              {!!this.state.passwordError && (
                              <Text style={styles.errorText}>{this.state.passwordError}</Text>
              )}
              </View>

              <Text style={{fontSize:11,fontWeight:'bold',
                    color:'#B0B0B0',textAlign:'right',marginTop:10,marginRight:55}}>{AppStrings.forgot_pass}</Text>


          <TouchableOpacity style={styles.loginSignupButtonView}
          onPress={() => this.Validation()}
          >
              <Text style={styles.loginText}>{'LOGIN'}</Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Text style={{fontSize:11,fontWeight:'bold',
                color:'#B0B0B0',textAlign:'center',marginTop:20,}}>{AppStrings.dont_have_account}</Text>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')}>
              <Text style={{fontSize:11,fontWeight:'bold',
                  color:'#efa75b',textAlign:'center',marginTop:20,marginLeft:5}}>{AppStrings.signup}</Text>
            </TouchableOpacity>
          </View>


      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:'#f2f2f2',
  },
loginSignupButtonView: {
    backgroundColor:'#6200ed',
    width: 290,
    height: 50,
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
    borderRadius:6,
    marginTop:25
  },
  loginText:{
    color:"#FFFF",
    fontSize:16,
    //fontFamily:AppFonts.font_bold,
    fontWeight:'bold'
  },
  imgbackArrow:{
    width:25,
    height:25,
    margin:20,
    tintColor:'black'
  },
  errorText:{
    color: 'red',
    fontSize: 13,
  },

});
