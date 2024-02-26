import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Tarefas } from './Tarefas';

const App = () => {

  const [tarefas, setTarefas] = React.useState([]);
  const [tarefa, setTarefa] = React.useState(null);

  function adicionarTarefa() {

    if (tarefa === '') {
      return alert('Digite uma tarefa');
    }

    const novaTarefa = {
      tarefa: tarefa,
      isConcluido: false
    }

    setTarefas([...tarefas, novaTarefa]);
    setTarefa(null);
  }

  function deletarTarefa(indice) {
    // copia do array
    const copiaTarefas = [...tarefas];

    // atualizar item
    const arrayAtualizado = copiaTarefas.filter((_, index) => index !== indice);

    // atualizar estado
    setTarefas(arrayAtualizado);
  }

  function marcarTarefa(indice) {
    // copia do array
    const copiaTarefas = [...tarefas];

    // atualizar item
    copiaTarefas[indice].isConcluido = !copiaTarefas[indice].isConcluido;

    // atualizar estado
    setTarefas(copiaTarefas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas do dia</Text>

      <FlatList
        data={tarefas}
        renderItem={({ item, index }) => (
          <Tarefas item={item} indice={index} delTarefa={deletarTarefa} marcarTarefa={marcarTarefa} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          value={tarefa}
          onChangeText={(texto) => setTarefa(texto)}
        />
        <TouchableOpacity onPress={() => adicionarTarefa()} style={styles.addBtn}>
          <Ionicons name="add" size={30} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 90
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row', //eixo horizontal
    justifyContent: 'center', // alinhamento horizontal
    alignItems: 'center', // alinhamento vertical
    padding: 30,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%'
  },
  addBtn: {
    marginLeft: 10,
    marginTop: 4,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'white',
  }
});


export default App;