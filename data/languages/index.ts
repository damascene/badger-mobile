import AsyncStorage from "@react-native-community/async-storage";
import * as Storage from "./store";
import RNRestart from "react-native-restart";

function get_lang(callback: Function) {
  let op;
  let data = Storage.get("@lang");
  // console.log("data : ", data);
  data
    .then(lang => {
      if (data) {
        op = lang;
      } else {
        op = null;
      }

      callback(op);
    })
    .done();
}

const getLang = async (setLang: Function) => {
  try {
    let value: any = await AsyncStorage.getItem("@lang");
    // value previously stored
    // console.log(value.toString());
    value = JSON.parse(value).name;
    setLang(value);
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const getLangCode = async (setLang: any) => {
  try {
    let value: any = get_lang((data: string) => {
      let value: String = JSON.parse(data).code;
      setLang = value.toString();
      return value;
    });
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const setLang = async (value: any) => {
  try {
    value = JSON.stringify(value);
    await Storage.store("@lang", value);
    RNRestart.Restart();
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export { getLang, getLangCode, setLang, get_lang };
