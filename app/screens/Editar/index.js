import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarTarefa = ({ navigation, route }) => {
  const { indice, tarefa } = route.params;
  const [tarefaEditada, setTarefaEditada] = useState(tarefa);


  const saveTask = async () => {
    //pegar do asyncStorage a lista de tarefas
    const tarefas = await AsyncStorage.getItem('tarefas');

    // transformar a lista de tarefas em um array
    const tarefasArray = JSON.parse(tarefas);

    tarefasArray[indice] = tarefaEditada;

    // atualizar a lista de tarefas no asyncStorage
    await AsyncStorage.setItem('tarefas', JSON.stringify(tarefasArray));

    // voltar para a tela de tarefas
    navigation.goBack();

  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={tarefaEditada.tarefa}
        onChangeText={(text) => setTarefaEditada({ ...tarefaEditada, tarefa: text })}
      />
      <Button mode="contained" onPress={saveTask}>
        Salvar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});


export default EditarTarefa;
