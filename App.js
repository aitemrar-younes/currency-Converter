import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

import ConvertCurrency from './components/convertCurrency';
import Api from './components/api';
import Test from './components/test';
import Select from './components/select';

export default function App() {  
  
  return (
    <View style={styles.container}>
      <ConvertCurrency />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});
