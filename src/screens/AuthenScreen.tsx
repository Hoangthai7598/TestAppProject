import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {retrieveData, storeData} from '../services/Storage';
const FIRST_LOGIN = 'firstLogin';
export default function AuthenScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    const data = await retrieveData(FIRST_LOGIN);
    if (!data) {
      await storeData(FIRST_LOGIN, 'first login');
    }
    return data;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={styles.btn}>
          <Text style={styles.txt}>Authenticaion</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 8,
  },
  txt: {
    color: 'white',
  },
});
