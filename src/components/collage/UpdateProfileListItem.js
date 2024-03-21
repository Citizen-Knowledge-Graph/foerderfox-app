import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ModalUpdateButton from '../generic/ModalUpdateButton';

const UpdateProfileListItem = ({currentEntry, setModalVisible}) => {
  const [inputText, setInputText] = useState(currentEntry.valuePair.value);
  const [updateValue, setUpdateValue] = useState('');

  useEffect(() => {
    setUpdateValue(inputText);
  }, [inputText]);

  return (
    <View style={styles.container}>
      <Text style={styles.updateTitle}>New {currentEntry.valuePair.title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setInputText(text)}
        value={inputText}
        placeholder="Enter new value"
      />
      <ModalUpdateButton
        identifier={currentEntry.key}
        initialValue={currentEntry.valuePair.value}
        updateValue={updateValue}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#8e8e93',
    borderRadius: 5,
    marginTop: 16,
  },
  categoryContainer: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueContainer: {
    color: 'black',
    fontSize: 18,
  },
});

export default UpdateProfileListItem;
