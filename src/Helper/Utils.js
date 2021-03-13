import {Alert} from 'react-native';


export default class Utils {

  static isValidEmailAddress = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
      return false;
    }
    else {
      return true;
    }
  }

  static isStringNull = (text) => {
    if(text === null || text === "" || text === "[]" || text === "null" || text === undefined)
    {
      return true;
    }
    else {
      return false;
    }
  }

  static isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

}
