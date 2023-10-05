import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

export default function LoginScreen() {
  const [userName, setUsername] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const navigation = useNavigation();
  const onPressLogin = async () => {
    // Store the credentials
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword({
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      });
      if (credentials) {
        if (
          userName === credentials.username &&
          passWord === credentials.password
        ) {
          navigation.navigate('Home');
        }
        console.log('credentials', credentials);
      } else {
        await Keychain.setGenericPassword(userName, passWord, {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        });
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={userName}
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={passWord}
        onChangeText={setPassWord}
      />
      <TouchableOpacity onPress={onPressLogin}>
        <View style={styles.btn}>
          <Text style={styles.txt}>Login</Text>
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
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 8,
    height: 50,
    justifyContent: 'center',
  },
  txt: {
    color: 'white',
  },
  input: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    borderRadius: 16,
    height: 50,
    marginBottom: 20,
  },
});
