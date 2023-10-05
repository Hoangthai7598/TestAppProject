import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {decryptNote, Encrypted, retrieveAllNote} from '../services/CryptoNote';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Encrypted[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getNotes();
  }, []);

  const onPressAddNote = () => {
    navigation.navigate('Note', {refresh: () => getNotes()});
  };
  const getNotes = async () => {
    const data = await retrieveAllNote();
    if (data) {
      setNotes(data);
    }
  };
  const renderItem = ({item, index}: {item: Encrypted; index: number}) => {
    console.log('renderItem', decryptNote(item.value));

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Note', {note: item, refresh: () => getNotes()})}>
        <View style={styles.item} key={index}>
          <Text>{decryptNote(item.value)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item?.key.toString()}
      />
      <TouchableOpacity onPress={onPressAddNote}>
        <View style={styles.btn}>
          <Text style={styles.txt}>Add Note</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingVertical: 40,
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
  },
  contentContainerStyle: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    marginBottom: 10,
    justifyContent: 'center',
  },
});
