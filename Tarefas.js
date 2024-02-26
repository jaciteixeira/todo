import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Tarefas = ({ item, indice, delTarefa, marcarTarefa }) => {
  return (
    <TouchableOpacity onPress={() => marcarTarefa(indice)}>
      <View style={styles.container}>
        <Text style={{ textDecorationLine: item.isConcluido ? 'line-through' : null }}>{item.tarefa}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => delTarefa(indice)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>

          {item.isConcluido && (
            <Ionicons name="checkmark-done" size={24} color="green" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10
  }
});