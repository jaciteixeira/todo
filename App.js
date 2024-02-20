import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


const Tarefas = ({ item }) => {
  return (
    <View style={{ marginBottom: 10, backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
      <Text>{item}</Text>
    </View>
  );
}


const App = () => {

  const arrTarefas = [
    {'tarefa':'Tarefa1', 'isDone': false},
    {'tarefa':'varrer sala', 'isDone': false},
    {'tarefa':'limpar pia', 'isDone': false},
   
  ]

  const [tarefas, setTarefas] = React.useState(['tafera']);
  const [tarefa, setTarefa] = React.useState('');

  function adicionarTarefa() {

    if (tarefa === '') {
      return alert('Digite uma tarefa');
    }

    setTarefas([...tarefas, tarefa]);
    setTarefa('');
  }

  function deletarTarefa(indice){
    const copyArr = [...arrTarefas]
    const copy = tarefas.filter((item, index) => {
      if (index !== indice){
        setTarefas(copy)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas do dia</Text>

      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <Tarefas item={item} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 40,
    borderRadius: 15,
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