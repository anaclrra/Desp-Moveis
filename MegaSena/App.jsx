import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,  FlatList  } from 'react-native';

export default function App() {

  const [nums, setNums] = useState([]);

  const randomNumGenerate = () => {
    let newNums = [];
    while (newNums.length < 6) {
      let num = Math.floor(Math.random() * 60) + 1;
      if (!newNums.includes(num)) {
        newNums.push(num);
      }
    }
    setNums(newNums);
  };

  const renderItem = ({ item }) => (
    <View style={styles.numeroContainer}>
      <Text style={styles.numero}>{item}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={nums}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.numeroRow}
      />
      <Button
        title="Gerar Números"
        onPress={randomNumGenerate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  numeroRow: {
    justifyContent: 'center',
    alignItems: 'center'  
  },
  numeroContainer: {
    width: 50, 
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10
  },
  numero: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
