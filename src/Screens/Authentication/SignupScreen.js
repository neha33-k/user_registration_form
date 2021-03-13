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
import AppStrings from "../../Resource/AppStrings"
import {Utils,ResponsiveUtils} from "../../Helper"
//import {getFontSize, getLayoutSize} from "../Helper/ResponsiveUtils"

//import SQLite from 'react-native-sqlite-storage';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({name: 'user_db.db', createFromLocation: 1});

export default class SignupScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state={
      defaultNum : 1000,
      count : '',
      loading:false,
      userId:'',
      passwordError:'',
      password:'',
      uname:'',
      unameError:'',
      username:'',
      usernameError:'',
      passwordError:'',
      phoneNumber:'',
      phoneNumberError:'',
      userData:[],
      index:0,
    };
  }

  async componentDidMount() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='User_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS User_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS User_Table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(30), user_phone INT(15), user_password VARCHAR(255))',
              []
            );
          }
        }
      );
    })
   }


   /* insertData = () => {

     db.transaction(function (tx) {
       tx.executeSql(
         'INSERT INTO User_Table (user_name, user_phone, user_password) VALUES (?,?,?)',
         [this.state.username, this.state.phoneNumber, this.state.password],
         (tx, results) => {
           console.log('Results', results.rowsAffected);
           if (results.rowsAffected > 0) {
             Alert.alert('Data Inserted Successfully....');
           } else Alert.alert('Failed....');
         }
       );
     });

     viewUser() ;

   }

   const viewUser = () => {

     db.transaction((tx) => {
       tx.executeSql(
         'SELECT * FROM User_Table',
         [],
         (tx, results) => {
           var temp = [];
           for (let i = 0; i < results.rows.length; ++i)
             temp.push(results.rows.item(i));
           console.log(temp);
         }
       );
     });

   }*/


  Validation = async () => {
    var iserror = false

    if(Utils.isStringNull(this.state.username) ){
      iserror = true;
      this.setState(() => ({ unameError: 'Please enter username.'}));
    }else{
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if(format.test(this.state.username)){
          iserror = true;
          this.setState(() => ({ unameError: 'Special characters are not allowed.'}));
        } else {
          iserror = false;
          this.setState(() => ({ unameError: null}));
        }
    }

    if(Utils.isStringNull(this.state.phoneNumber)){
      iserror = true;
      this.setState(() => ({phoneNumberError: 'Please enter phone no.'}));
    }else {
      iserror = false;
          this.setState(() => ({ phoneNumberError: null}));
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
      alert("Signup Succesfully!")
      //insertData()
    /*const {username, phoneNumber, password} = this.state
      db.transaction(function (tx) {
        console.log("--- enter");
            tx.executeSql(
              'INSERT INTO tbl_user (user_name, user_contact, user_password) VALUES (?,?,?)',
              [username, phoneNumber, password],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        //onPress: () => this.props.navigation.navigate('Login'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Registration Failed');
              }
            );
          });*/
  }
}


  render() {
    return (
      <View style={styles.container}>
       <TouchableOpacity onPress={() => this.props.navigation.goBack() } >
          <Image style={styles.imgbackArrow}
              source={require('../../Assets/back_arrow.png')} />
       </TouchableOpacity>

        <Text style={{fontSize:25,fontWeight:'bold',
              color:'#efa75b',textAlign:'center',marginTop:200}}>{AppStrings.create_acc}</Text>

              <View style={{width:290,alignSelf:'center',marginTop:30,}}>
              <TextInput
                    style={{borderWidth: 1.5,borderRadius:6,paddingLeft:15,borderColor:'#C9C9C9',
                    backgroundColor:'white'}}
                    placeholder={'Username'}
                    value={this.state.username}
                    keyboardType="default"
                    onChangeText={(text) => this.setState({uname:text, unameError: null,username:text})}
              />

              {!!this.state.unameError && (
                  <Text style={styles.errorText}>{this.state.unameError}</Text>
              )}

              </View>

              <View style={{width:290,alignSelf:'center',marginTop:10,}}>
              <TextInput
                    style={{borderWidth: 1.5,borderRadius:6,paddingLeft:15,borderColor:'#C9C9C9',
                    backgroundColor:'white'}}
                    placeholder={'Phone No.'}
                    value={this.state.phoneNumber}
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={(text) => this.setState({ phoneNumber: text ,phoneNumberError: null })}
              />
              {!!this.state.phoneNumberError && (
                  <Text style={styles.errorText}>{this.state.phoneNumberError}</Text>
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
                    //  onSubmitEditing={()=> this.Validation() }
                  />

              {!!this.state.passwordError && (
                  <Text style={styles.errorText}>{this.state.passwordError}</Text>
              )}
              </View>

          <TouchableOpacity style={styles.loginSignupButtonView}
          onPress={() => this.Validation()}
          >
              <Text style={styles.loginText}>{'SIGN UP'}</Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Text style={{fontSize:11,fontWeight:'bold',
                color:'#B0B0B0',textAlign:'center',marginTop:20,}}>{AppStrings.already_acc}</Text>

          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
            <Text style={{fontSize:11,fontWeight:'bold',
                color:'#efa75b',textAlign:'center',marginTop:20,marginLeft:5}}>Login</Text>
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
