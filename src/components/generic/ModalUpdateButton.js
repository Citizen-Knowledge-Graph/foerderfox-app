import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {updatePredicatedObject} from '../../utilities/graphManagement';
import useDeserializedUserData from '../../hooks/useDeserializedUserData';
import userReportAction from '../../storage/actions/userReport';
import {useDispatch} from 'react-redux';

const ModalUpdateButton = ({
  category,
  initialValue,
  updateValue,
  setModalVisible,
}) => {
  const userData = useDeserializedUserData();
  const dispatch = useDispatch();

  const storeNewValue = () => {
    const updatedUserData = updatePredicatedObject(
      userData,
      category,
      initialValue,
      'replace',
      updateValue,
    );
    console.log('updatedUserData: ', updatedUserData);
    dispatch(userReportAction('user-profile', updatedUserData));
  };

  console.log('we are updating: ', category, initialValue, updateValue);

  return (
    <TouchableOpacity
      style={styles.updateButton}
      onPress={() => {
        setModalVisible(false);
        storeNewValue();
      }}>
      <View style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 4,
    elevation: 2,
    margin: 4,
  },
  updateButtonText: {
    fontSize: 16,
  },
});

export default ModalUpdateButton;