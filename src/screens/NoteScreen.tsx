import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {decryptNote, storeNote} from '../services/CryptoNote';

export default function AuthenScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [note, setNote] = useState(
    route?.params?.note ? decryptNote(route?.params?.note?.value) : '',
  );
  const isEditing = route?.params?.note;
  console.log('route', route);

  const onPressSave = () => {
    if (isEditing) {
      storeNote(note, route?.params?.note.key);
    } else {
      storeNote(note, new Date().getTime());
    }
    route?.params?.refresh();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={note}
        placeholder="Note"
        onChangeText={setNote}
      />
      <TouchableOpacity onPress={onPressSave}>
        <View style={styles.btn}>
          <Text style={styles.txt}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 8,
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
