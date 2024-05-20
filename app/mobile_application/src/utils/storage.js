import AsyncStorage from '@react-native-async-storage/async-storage';
// import NodeCache from 'node-cache';

// const myCache = new NodeCache({stdTTL: 100, checkperiod: 120});

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

export const storeMultipleData = async dataArray => {
  try {
    AsyncStorage.multiSet(dataArray);
  } catch (e) {}
};

export const getMultipleData = async keys => {
  try {
    const value = await AsyncStorage.multiGet(keys);
    console.log(value);
    // return value !== null ? value : '';
  } catch (e) {
    return '';
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    // console.log(value);
    return value !== null ? value : '';
  } catch (e) {
    return '';
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
  }
};
