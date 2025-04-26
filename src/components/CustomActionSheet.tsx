import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const CustomActionSheet = ({ visible, onClose, onOptionPress }: any) => {
  const options = ['Set as Wallpaper', 'Copy', 'Move', 'Rename', 'Details'];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={onClose}>
        <View style={styles.sheet}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                onOptionPress(index);
                onClose();
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  cancel: {
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ff3b30', // Red cancel button color (attractive)
  },
});

export default CustomActionSheet;
